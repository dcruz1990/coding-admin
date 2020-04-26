import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { map, catchError } from 'rxjs/operators';

import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private http: HttpClient) {

  }

  baseUrl = 'http://localhost:5050/api'

  isAuthenticated: boolean

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users/' + id);
  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('data')).id
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('data'))
  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + /post/ + id)
  }

  getCurrentUserPohotos() {
    return JSON.parse(localStorage.getItem('data')).photos
  }

  updateUser(id: number, userdata: any) {
    // tslint:disable-next-line: object-literal-key-quotes
    return this.http.put(this.baseUrl + '/users/' + id, userdata, { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }).pipe(
      map((result: any) => {
        return result;
      }), catchError(error => {
        console.log(error)
        return throwError('Something went wrong!');
        // return error

      })
    )
  }
}



