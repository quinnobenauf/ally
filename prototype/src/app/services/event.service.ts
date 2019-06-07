import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../interfaces/user';
import { Event } from '../interfaces/event';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = 'http://localhost:4100/events';

  constructor(private http: HttpClient) { }

  getEventList(id: string, user: User): Observable<any> {
    return this.http.get(`${this.eventsUrl}/host/${id}`, httpOptions);
  }

  createEvent(event: Event) {
    return this.http.post(
      this.eventsUrl,
      JSON.stringify(event),
      httpOptions
      );
  }
}
