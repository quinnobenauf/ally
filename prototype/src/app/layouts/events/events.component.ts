import { Component, OnInit } from '@angular/core';

import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event'

import {FormControl} from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
import { Allergy } from 'app/interfaces/allergy';
import { Diet } from 'app/interfaces/diet';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  friendsList = new FormControl();
  guestList = new FormControl();
  user: User = new User();
  events: Event[] = new Array<Event>();
  selectedEvent: Event = new Event();
  selectedDiets: Diet[] = new Array<Diet>();
  selectedAllergies: Allergy[] = new Array<Allergy>();
  friends: User[] = new Array<User>();
  constructor(
    private accountService: UserService,
    private eventService: EventService,
    private modalService: NgbModal) {
   }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.selectedEvent = new Event();
    this.getEventList(this.user._id);
    this.accountService.getUserById(this.user._id).subscribe(user => {
      this.user = user;
      this.getFriendsList(this.user._id);
    });
  }

  getEventList(id: string): void {
    this.eventService.getEventList(id, this.user).subscribe((res: Event[]) => {
      res.forEach(item => {
        var event = new Event();
        event._id = item._id;
        event.title = item.title;
        event.host = item.host;
        event.guests = this.getGuestList(item);
        event.date = item.date;
        event.location = item.location;
        this.events.push(event);
      });
    });
  }

  getGuestList(event: Event): Array<User> {
    var newGuests = new Array<User>();
    event.guests.forEach(guest => {
      this.accountService.getUserById(String(guest)).subscribe(user => {
        newGuests.push(user);
      });
    })
    return newGuests;
  }

  // fetch friends list
  getFriendsList(id: string) {
    this.accountService.getFriendsList(id).subscribe((res: User[]) => {
      res.forEach(friend => {
        this.friends.push(friend);
      });
    });
  }

  openEdit(content, event) {
    this.modalService.open(content, {size: 'lg', centered: true});
    if (event == null) {
      this.selectedEvent = new Event();
      return;
    }
    this.selectedEvent = event;
    var currentGuests = new Array<User>();
    this.friends.filter(friend => {
      event.guests.forEach(guest => {
        if (guest._id == friend._id)
          currentGuests.push(friend);
      })
    });
    this.friendsList.setValue(currentGuests);
  }

  openDiets(diets, event) {
    this.modalService.open(diets, {size: 'lg', centered: true});
    if (event == null) {
      this.selectedEvent = new Event();
      return;
    }
    this.selectedEvent = event;
    this.selectedAllergies = null;
    this.selectedDiets = null;
    this.eventService.getEventAllergies(event).subscribe((res: Allergy[]) => {
      res.forEach(item => {
        this.selectedAllergies.push(item);
      });
    });
    this.eventService.getEventDiets(event).subscribe((res: Allergy[]) => {
      res.forEach(item => {
        this.selectedDiets.push(item);
      });
    });
  }
 
  done() {
    if (this.selectedEvent._id == null){
      var newEvent = this.constructEvent();
      this.eventService.createEvent(newEvent)
    .subscribe();
    this.events.push(newEvent)
    }
    else{
      var newEvent = this.constructEvent();
      newEvent._id = this.selectedEvent._id;
      var res = this.eventService.modifyEvent(this.selectedEvent._id, newEvent).subscribe();
      var index = -1;
      this.events.forEach(event => {
        if (event._id == this.selectedEvent._id){
          index = this.events.indexOf(event);
        }
      })
      this.events[index] = newEvent;
    }
    this.modalService.dismissAll();
    this.friendsList.setValue(null);
  }

  constructEvent(): Event {
    var event = new Event();
    event.title = (document.getElementById(
      "eventTitle"
    ) as HTMLInputElement).value;
    event.date = (document.getElementById(
      "eventDate"
    ) as HTMLInputElement).value;
    event.location = (document.getElementById(
      "location"
    ) as HTMLInputElement).value;
    event.host = this.user._id;
    event.guests = this.friendsList.value;
    return event;
    // add the returned event to events
  }

  delete() {
    if (this.selectedEvent._id != null){
      this.eventService.deleteEvent(this.selectedEvent).subscribe()
      // get this working
      var index = this.events.indexOf(this.selectedEvent);
      if (index !== -1) {
          this.events.splice(index, 1);
      }
      this.modalService.dismissAll();
    }
  }

  createNewEvent(): void
  {
    this.modalService.open(null, {size: 'lg', centered: true});
  }
}
