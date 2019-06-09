import { Component, OnInit } from '@angular/core';

import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event'

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  user: User = new User();
  events: Event[] = new Array<Event>();
  selectedEvent: Event = new Event();
  friends: User[] = new Array<User>();
  constructor(
    private accountService: UserService,
    private eventService: EventService,
    private modalService: NgbModal) {
   }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.selectedEvent = new Event();
    this.accountService.getUserById(this.user._id).subscribe(user => {
      this.user = user;
      this.getEventList(this.user._id);
    });
    this.getFriendsList(this.user._id);
  }

  getEventList(id: string): void {
    this.eventService.getEventList(id, this.user).subscribe((res: Event[]) => {
      res.forEach(item => {
        var event = new Event();
        event._id = item._id;
        event.title = item.title;
        event.host = item.host;
        event.guests = item.guests;
        event.date = item.date;
        event.location = item.location;
        this.events.push(event);
      });
    });
  }

  // fetch friends list
  getFriendsList(id: string) {
    this.accountService.getFriendsList(id).subscribe((res: User[]) => {
      res.forEach(friend => {
        this.friends.push(friend);
      });
    });
  }

  open(content, event) {
    this.modalService.open(content, {size: 'lg', centered: true});
    if (event == null) {
      this.selectedEvent = new Event();
      return;
    }
    this.selectedEvent = event;
  }

  done() {
    if (this.selectedEvent._id == null){
      //add new event
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
      // get this call working
      this.eventService.createEvent(event)
      .subscribe(newEvent => this.events.push(newEvent));
      // add the returned event to events
    }
    else{
      //update event
    }
    this.modalService.dismissAll();
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
