import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NbDialogService } from '@nebular/theme'
import { Tag } from 'src/app/models/Tag';
import { PostService } from 'src/app/services/post.service';

import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.scss']
})
export class TaglistComponent implements OnInit {

  spinner = false

  pageOfItems: Array<any>;

  tags: Tag[]

  constructor(private alert: AlertService, private postService: PostService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.postService.getAlTags().subscribe((result) => {
      this.tags = result
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  openDeleteDialog(dialog: TemplateRef<any>, tag: any) {
    this.dialogService.open(dialog, {
      context: 'Do you want to delete this tag?'
    }).onClose.subscribe(
      (result) => {
        if (result === 'delete') {
          this.spinner = true
          console.log(result)

          this.postService.deleteTag(tag.id).subscribe((ok) => {
            this.alert.showToast('bottom-left', 'info', 'Tag deleted!', 'Your tag was deleted!')
          })
          this.postService.updatedTags.subscribe((freshtags) => {
            this.tags = freshtags
            this.spinner = false
          }
          )

        }

      }
    )
  }

  openEditDialog(dialog: TemplateRef<any>, mycontext: any) {
    this.dialogService.open(dialog, {
      context: mycontext
    }).onClose.subscribe(
      (result) => {
        if (result) {
          this.spinner = true
          console.log(result)
          const tagid = result.id
          const tagbody = {
            title: result.title,
            description: result.description
          }
          console.log(tagid)
          console.log(tagbody)
          this.postService.editTag(tagid, tagbody).subscribe((ok) => {
            console.log(ok)
          })
          this.postService.updatedTags.subscribe((freshtags) => {
            this.tags = freshtags
            this.spinner = false
          }
          )

        }

      }
    )
  }


}
