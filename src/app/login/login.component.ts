import { Component, OnInit } from '@angular/core';



import { AuthService } from '../services/Auth.service';
import { User } from '../models/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {
    username: '',
    password: ''
  };
  isAuthenticated = false;
  currentUser: User;

  constructor(private auth: AuthService) {

  }

  test() {
    console.log('Click works');
  }

  ngOnInit() {

  }

  login() {
    this.auth.Login(this.model).subscribe(
      next => {
        this.isAuthenticated = true;


      },
      error => {
        console.log('error');
      },
    );
  }

  LoggedIn() {
    return this.auth.LoggedIn();
  }

}
