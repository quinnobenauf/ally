import { Injectable } from '@angular/core';
import { Event } from './event';
import { EVENTS } from './mock-events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents(): Event[] {
    return EVENTS;
  }
}
