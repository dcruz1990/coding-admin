import { Component, OnInit, ViewChild, HostListener, TemplateRef, AfterViewInit } from '@angular/core';
import { NbDialogService, NbWindowService } from '@nebular/theme';

import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'
import { AlertService } from '../services/alert.service'
import { NgForm } from '@angular/forms';

import { PhotoaddComponent } from './photoadd/photoadd.component'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // entryComponents: [PhotoaddComponent]
})



export class ProfileComponent implements OnInit {
  updateSpinner = false
  profileSpinner = false;
  userid: number
  myuser: any
  // @ViewChild('dialogRef', { static: true }) dialogRef: TemplateRef<any>;

  @ViewChild('editProfileForm', { static: false }) editProfileForm: NgForm;


  // @HostListener("window:beforeunload", ["$event"])
  // unloadNotification($event: any) {
  //   if (this.editProfileForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }



  constructor(private windows: NbWindowService, private user: UserService, private auth: AuthService, private alert: AlertService, private dialogService: NbDialogService) { }

  // open(dialog: TemplateRef<any>) {
  //   this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  // }

  open() {
    this.dialogService.open(PhotoaddComponent, { context: 'this is some additional data passed to dialog' });
  }


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
        this.editProfileForm.reset(this.myuser);
      },
      error => {
        this.updateSpinner = false;
        this.alert.showToast('top-right', 'danger', error, 'There was an error!')
      }
    );
  }



}
