import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userid: number
  myuser: any

  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.userid = this.auth.getUserId()

    this.user.getUser(this.userid).subscribe((result) => {
      this.myuser = result
    })


  }

  updateProfile(form: any) {
    console.log(form)
    this.user.updateUser(this.userid, form).subscribe(result => {
      console.log(result)
    })
  }



}
