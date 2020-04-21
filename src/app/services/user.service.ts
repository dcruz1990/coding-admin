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

  }



}
