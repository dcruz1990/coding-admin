import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service'
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  myuser: any

  usernameControl = new FormControl('');

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getUser(1).subscribe((result) => {
      this.myuser = result
    })


  }

  updateProfile(form: any) {
    console.log("Updat profile")
    console.log(form.form.value)
  }



}
