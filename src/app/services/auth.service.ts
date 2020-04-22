import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { User } from '../models/User';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogedIn = new BehaviorSubject(true);

  currentLoginStatus = this.isLogedIn.asObservable();

  jwtHelper = new JwtHelperService();

  apiUrl = 'http://localhost:5050/api/'

  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.apiUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeCurrentLoginStatus(true)
          // this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  changeCurrentLoginStatus(status: boolean) {
    this.isLogedIn.next(status)
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.changeCurrentLoginStatus(false)
  }


}


