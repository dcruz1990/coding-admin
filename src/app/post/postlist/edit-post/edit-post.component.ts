import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NbDialogRef } from '@nebular/theme';
import { PostService } from 'src/app/services/post.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  editSpinner = false

  @Input() post: any

  deleteSpinner = false;

  constructor(private user: UserService, protected dialogRef: NbDialogRef<any>, private postService: PostService, private toast: AlertService) { }

  ngOnInit() {

  }

  editItem(id: number, post: any) {
    this.editSpinner = true
    this.postService.editProduct(id, post).subscribe(result => {
      this.editSpinner = false
      this.toast.showToast('bottom-left', 'info', 'Update ok', 'Your post has been updated!')
      this.postService.getUserPosts(this.user.getCurrentUserId()).subscribe((data) => {
        let postslenght
        postslenght = data.length
        this.dialogRef.close(postslenght)
      }, err => {
        const myerr = err
        this.dialogRef.close(myerr)
      })
      this.dialogRef.close()

    })

  }

}
