import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NbDialogService } from '@nebular/theme'
import { Tag } from 'src/app/models/Tag';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';

import { DatePipe } from '@angular/common'
import { AlertService } from 'src/app/services/alert.service';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';


@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})


export class PostlistComponent implements OnInit {

  pageOfItems: Array<any>;

  spinner = false
  // data: any
  userposts: Post[]

  constructor(private route: Router, private toast: AlertService, private dialog: NbDialogService, private user: UserService, private auth: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.postService.getUserPosts(this.user.getCurrentUserId()).subscribe((result) => {
      this.userposts = result
    }
    )
  }

  openDeleteDialog(postToDelete: Object) {
    this.dialog.open(DeletePostComponent, {
      context: {
        post: postToDelete
      }, closeOnBackdropClick: false
    }).onClose.subscribe((data) => {
      this.spinner = true;
      if (data) {
        if (data.status === 404) {
          this.spinner = false
          this.userposts = []
          this.toast.showToast('top-right', 'info', 'Theres no posts here :(', 'Cant find any product')
        } else {
          this.postService.updatedPosts.subscribe((result) => {
            if (result) {
              this.userposts = result
              this.spinner = false;
            }
          })
        }
        if (data === 'closed') {
          this.postService.getUserPosts(this.user.getCurrentUserId()).subscribe((result) => {
            this.userposts = result
          }
          )
        }
      }
    });
  }

  openEditDialog(postToEdit: Object) {
    this.dialog.open(EditPostComponent, {
      context: {
        post: postToEdit
      }, closeOnBackdropClick: false
    })
    // .onClose.subscribe((data) => {
    // });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  goToAddPost() {
    this.route.navigate(['posts/new'])
  }

}


