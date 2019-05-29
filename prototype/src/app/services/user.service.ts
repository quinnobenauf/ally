import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";

import { User } from "../interfaces/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  private usersUrl = "http://localhost:4100/users";

  constructor(private http: HttpClient) {}

  // TODO
  getAllusers(): Observable<any> {
    return this.http.get(this.usersUrl, httpOptions);
  }

  // TODO
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`, httpOptions);
  }

  // TODO
  modifyUser(id: string, user: User): Observable<any> {
    console.log("SERVICE USER FRIENDS: ", user.friends);
    return this.http.put(`${this.usersUrl}/${id}`, user, httpOptions);
  }

  // TODO
  deleteUser(user: User): Observable<any> {
    return;
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl, JSON.stringify(user), httpOptions);
  }

  getFriendsList(id: string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}/friends`, httpOptions);
  }
}
