import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  langs: {}

  constructor(private resume: ResumeService, private user: UserService) { }

  ngOnInit() {
    this.resume.getLanguages(this.user.getCurrentUserId()).subscribe((data) => {
      this.langs = data;
    })
  }

}
