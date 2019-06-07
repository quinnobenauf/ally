import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { User } from "../interfaces/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class DietService {
  private dietsUrl = "/diets/filter";

  constructor(private http: HttpClient) {}

  getDietList(id: string, user: User): Observable<any> {
    return this.http.get(`${this.dietsUrl}/${id}`, httpOptions);
  }
}
