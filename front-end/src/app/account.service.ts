import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private usersUrl = "http://localhost:4100/users"

  constructor(private http: HttpClient) { }

  // TODO
  getAllusers(): Observable<any> {
    return this.http.get(this.usersUrl, httpOptions);
  }

  // TODO
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`, httpOptions);
  }

  // TODO
  modifyUser(user: User): Observable<any> {
    return
  }

  // TODO
  deleteUser(user: User): Observable<any> {
    return
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl, JSON.stringify(user), httpOptions);
  }
}
