import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { tap, delay, map } from "rxjs/operators";

import { User } from "../interfaces/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authUrl = "/auth";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  redirectUrl: string;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user: User) {
    return this.http.post<User>(
      `${this.authUrl}/register`,
      JSON.stringify(user),
      httpOptions
    );
  }

  login(email: string, password: string) {
    console.log("ATTEMPT LOGIN");
    var user = new User();
    user.email = email;
    user.password = password;
    return this.http
      .post<User>(`${this.authUrl}/login`, JSON.stringify(user), httpOptions)
      .pipe(
        map(res => {
          if (user) {
            sessionStorage.setItem("currentUser", JSON.stringify(res));
            this.currentUserSubject.next(res);
            this.isLoggedIn = true;
          }
          return res;
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
