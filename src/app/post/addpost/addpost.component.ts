import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import * as moment from 'moment';

import './ckeditor-loader'
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { AlertService } from 'src/app/services/alert.service';
import { Tag } from 'src/app/models/Tag';
import { Router } from '@angular/router';
// import 'ckeditor';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {

  now = moment().format('LLLL');

  tags: Tag[]

  postSpinner = false

  @ViewChild('newPostForm', { static: false }) newPostForm: NgForm;
  @ViewChild('mytext', { static: false }) mytext: any;

  public postBody = {
    title: '',
    description: '',
    post: '<p>Hello, world!</p>',
    userid: 0,
    readingTime: 0,
    tagId: 0
  };



  constructor(private router: Router, private user: UserService, private toPost: PostService, private toast: AlertService) { }

  ngOnInit() {
    this.toPost.getAlTags().subscribe((result) => {
      this.tags = result
    })

  }

  getReadingTime(postbody: string) {
    const wordCount = postbody.replace(/[^\w ]/g, "").split(/\s+/).length;

    const readingTimeInMinutes = Math.floor(wordCount / 228) + 1;
    const readingTimeAsString = readingTimeInMinutes + " min";

    return readingTimeInMinutes
  }

  test() {
    this.postBody.readingTime = this.getReadingTime(this.mytext._data)
    console.log(this.newPostForm.value)

  }

  postNow(data: any) {
    data.publishedAt = this.now
    data.readingTime = this.getReadingTime(data.text)
    data.userid = this.user.getCurrentUserId()
    this.postSpinner = true
    this.toPost.newPost(data).subscribe((request) => {
      this.postSpinner = false
      this.newPostForm.reset()
    }, error => {
      this.postSpinner = false;
    })
  }
}
