import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import './ckeditor-loader'
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { AlertService } from 'src/app/services/alert.service';
// import 'ckeditor';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {

  postSpinner = false

  @ViewChild('newPostForm', { static: false }) newPostForm: NgForm;
  @ViewChild('mytext', { static: false }) mytext: any;

  public postBody = {
    title: '',
    description: '',
    post: '<p>Hello, world!</p>',
    userid: this.user.getCurrentUserId(),
    readingTime: 0
  };



  constructor(private user: UserService, private toPost: PostService, private toast: AlertService) { }

  ngOnInit() {
    console.log(this.postBody)

    console.log(this.getReadingTime('asdasdsa'))

  }

  getReadingTime(postbody: string) {
    let wordCount = postbody.replace(/[^\w ]/g, "").split(/\s+/).length;

    let readingTimeInMinutes = Math.floor(wordCount / 228) + 1;
    let readingTimeAsString = readingTimeInMinutes + " min";

    return readingTimeInMinutes
  }

  test() {
    console.log(this.newPostForm)
    console.log("test clicked")
    console.log(this.newPostForm)

    this.postBody.readingTime = this.getReadingTime(this.mytext._data)

    console.log(this.postBody.readingTime)
    console.log(this.mytext._data)
  }

  postNow(data: any) {
    this.postSpinner = true
    this.toPost.newPost(data).subscribe(request => {

      this.postSpinner = false
      this.newPostForm.reset()
    }, error => {
      this.postSpinner = false;

    })
  }



}
