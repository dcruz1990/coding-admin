import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isAuthenticated: boolean

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.isAuthenticated().subscribe(result => {
      if (result) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }

    })

  }

  baseUrl = 'http://localhost:5050/api/users/';

  getUserMainPhoto(userid: Number): Observable<any> {
    if (this.isAuthenticated) {
      return this.http.get(this.baseUrl + userid)
    } else {
      console.log('please auth')
    }
  }


}
