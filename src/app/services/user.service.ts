import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { map, catchError } from 'rxjs/operators';
import { Photo } from '../models/Photo';

import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})


export class UserService {


  httpOptions = {
    headers: new HttpHeaders({
      Autorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {

  }

  baseUrl = 'http://localhost:5050/api'

  isAuthenticated: boolean



  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users/' + id);
  }

  updateUser(id: number, userdata: any) {
    return this.http.put(this.baseUrl + '/users/' + id, userdata, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: any) => {
        return result;
      }), catchError(error => {
        console.log(error)
        return throwError('Something went wrong!');
      })
    )
  }
}



