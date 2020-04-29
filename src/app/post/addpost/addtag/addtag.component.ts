import { Component, OnInit, Output } from '@angular/core';

import { PostService } from 'src/app/services/post.service';


import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.scss']
})
export class AddtagComponent implements OnInit {

  newtag = {
    title: '',
    description: ''
  }

  // @Output() newTagAdded = new EventEmitter();

  constructor(private post: PostService, protected dialogRef: NbDialogRef<any>) { }

  ngOnInit() {

  }


  addNewTag() {
    console.log(this.newtag)
    this.post.addNewTag(this.newtag).subscribe((result) => {
      this.dialogRef.close(result)
    }, error => {
      console.log(error)
    })
  }

}
