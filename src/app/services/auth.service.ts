import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import Config from '../config/backend'
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  header = {
    'Content-Type': 'application/json',
  }

  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient, private config: Config) { }

  login(model: any) {
    return this.http.post(this.config.apiUrl + 'auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          // this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

}
