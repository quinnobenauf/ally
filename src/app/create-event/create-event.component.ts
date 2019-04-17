import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { User } from '../user';
import { USERS } from '../mock-users';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventForm = new FormGroup({
    eventName: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl('')
  });
  
  constructor() { }

  ngOnInit() {
  }

  log(x: string) { console.log(x) }
}
