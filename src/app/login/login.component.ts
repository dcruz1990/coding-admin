import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service'
import { AlertService } from '../services/alert.service'
import { Router } from '@angular/router';

import { User } from '../models/User';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private index = 0;

  // Observable string sources
  userdata: any = {
    username: '',
    password: ''
  };
  currentUser: User;

  error: any

  loginSpinner = false;


  constructor(private auth: AuthService, private router: Router, private toast: AlertService) { }

  test() {
    console.log('Click works');
  }

  ngOnInit() {

  }

  login() {
    this.loginSpinner = true;
    this.auth.login(this.userdata).subscribe(
      next => { },
      error => {
        this.error = error
        this.toast.showErrorToast('top-right', 'danger', this.error)
        this.loginSpinner = false
      },
      () => {
        this.toast.showSuccessToast('top-right', 'success', 'You have sign in succefully!')
        this.router.navigate(['profile']);
      }
    );
  }

  testSpiner() {
    this.loginSpinner = true
  }



}
