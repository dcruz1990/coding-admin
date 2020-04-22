import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'
import { AlertService } from '../services/alert.service'




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateSpinner = false
  profileSpinner = false;
  userid: number
  myuser: any

  constructor(private user: UserService, private auth: AuthService, private alert: AlertService) { }

  ngOnInit() {
    this.profileSpinner = true
    this.userid = this.auth.getUserId()

    this.user.getUser(this.userid).subscribe((result) => {
      this.myuser = result
      this.profileSpinner = false
    })


  }

  updateProfile(userdata: any) {
    this.updateSpinner = true;
    this.user.updateUser(this.userid, userdata).subscribe(
      value => {
        this.updateSpinner = false;
        this.alert.showToast('bottom-left', 'success', 'Profile Update!', 'Profile updated succefuly')
      },
      error => {
        this.updateSpinner = false;
        this.alert.showToast('top-right', 'danger', error, 'There was an error!')
      }
    );
  }



}
