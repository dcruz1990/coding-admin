import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';




import { User } from '../models/User';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Observable string sources
  userdata: any = {
    username: '',
    password: ''
  };

  currentUser: User;

  constructor(private auth: AuthService, private router: Router) {

  }

  test() {
    console.log('Click works');
  }

  ngOnInit() {

  }

  login() {
    this.auth.login(this.userdata).subscribe(
      next => {

      },
      error => {
        console.log(error)
      },
      () => {
        this.router.navigate(['profile']);
      }
    );
  }

}
