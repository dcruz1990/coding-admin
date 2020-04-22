import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      Autorization: 'Bearer' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5050/api'

  isAuthenticated: boolean

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'api/users');
  }






}
