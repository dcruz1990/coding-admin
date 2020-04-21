import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';




import { User } from '../models/User';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Observable string sources
  private user = new Subject<User>();

  userLoggedin$ = this.user.asObservable();

  model: any = {
    username: '',
    password: ''
  };
  isAuthenticated = false;
  currentUser: User;

  constructor() {

  }

  test() {
    console.log('Click works');
  }

  ngOnInit() {

  }

  login() {
  }

  LoggedIn() {

  }

  announceUserLoged(u: User) {
    console.log('Usuario anunciado', u);
    this.user.next(u);
  }

}
