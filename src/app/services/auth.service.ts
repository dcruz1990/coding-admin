import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogedIn = new BehaviorSubject(true);

  private announceUser = new BehaviorSubject(Object)

  currentLoginStatus = this.isLogedIn.asObservable();

  currentUser = this.announceUser.asObservable();

  jwtHelper = new JwtHelperService();

  apiUrl = 'http://localhost:5050/api/'

  decodedToken: any;


  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.apiUrl + 'auth/login', model).pipe(
      map((response: any, ) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('data', JSON.stringify(this.decodedToken));
          this.currentUser = user.user;
          this.announceUser.next(user.user)
          this.changeCurrentLoginStatus(true)
          // this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      },
      ), catchError(this.handleError)
    );
  }

  changeCurrentLoginStatus(status: boolean) {
    this.isLogedIn.next(status)
  }

  changeCurrentUser(user: any) {
    this.announceUser.next(user);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('data')
    this.changeCurrentLoginStatus(false)
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('data')).nameid
  }


}


