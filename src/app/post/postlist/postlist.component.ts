import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Tag } from 'src/app/models/Tag';

interface TreeNode<T> {
  data: T;
  // children?: TreeNode<T>[];
  // expanded?: boolean;
}

interface FSEntry {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
}


@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})


export class PostlistComponent implements OnInit {

  // data: any
  userposts: any

  customColumn = 'id';
  defaultColumns = ['title', 'description', 'tags'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: TreeNode<FSEntry>[] = [
    {

      data: { id: 1, title: 'mi asdasd', description: 'post de prueba', tags: [] },

    },

  ];


  constructor(private user: UserService, private auth: AuthService) { }

  ngOnInit() {
    // this.data = this.user.getUserPosts(this.auth.getUserId()).subscribe(request => {
    //   console.log(request)
    // }, data => {
    //   this.userposts = data
    // })

    console.log(this.userposts)

  }

}
