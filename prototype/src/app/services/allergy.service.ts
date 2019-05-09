import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AllergyService {
  private allergiesUrl = 'http://localhost:4100/allergies/filter';

  constructor(private http: HttpClient) { }

  getAllergyList(id: string, user: User): Observable<any> {
    return this.http.get(`${this.allergiesUrl}/${id}`, httpOptions);
  }
}