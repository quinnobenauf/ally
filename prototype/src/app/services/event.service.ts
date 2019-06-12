import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { catchError, retry } from "rxjs/operators";

import { Observable, throwError } from "rxjs";

import { User } from "../interfaces/user";
import { Event } from "../interfaces/event";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class EventService {
  private eventsUrl = "/events/";
  constructor(private http: HttpClient) {}

  getEventList(id: string, user: User): Observable<any> {
    return this.http.get(`${this.eventsUrl}host/${id}`, httpOptions);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(
      this.eventsUrl,
      this.createBodyEvent(event),
      httpOptions
    );
  }

  getEventAllergies(event: Event): Observable<any> {
    return this.http.get(
      `${this.eventsUrl}${event._id}/allergies`,
      httpOptions
    );
  }

  getEventDiets(event: Event): Observable<any> {
    return this.http.get(`${this.eventsUrl}${event._id}/diets`, httpOptions);
  }

  modifyEvent(id: string, event: Event): Observable<any> {
    return this.http.put(
      `${this.eventsUrl}${id}`,
      this.createBodyEvent(event),
      httpOptions
    );
  }

  createBodyEvent(event: Event): any {
    var newGuests = new Array<string>();
    event.guests.forEach(guest => {
      var newGuest = new User();
      newGuests.push(guest._id);
    });
    var eventJson = JSON.parse(JSON.stringify(event));
    eventJson["guests"] = JSON.parse(JSON.stringify(newGuests));
    return eventJson;
  }

  deleteEvent(event: Event): Observable<{}> {
    const url = `${this.eventsUrl}${event._id}`;
    return this.http.delete(url, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
