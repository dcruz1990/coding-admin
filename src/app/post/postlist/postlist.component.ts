import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Tag } from 'src/app/models/Tag';


@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})


export class PostlistComponent implements OnInit {

  // data: any
  userposts: any

  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit() {
  }

}
