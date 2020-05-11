import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service'
import { NbMenuItem } from '@nebular/theme';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  currentUser: User
  
  constructor(private auth: AuthService) {
    // this.auth.getUser().subscribe(x => this.currentUser = x)
    console.log("me inicio")

   }
  title = 'coding-admin';

  isLoggedIn: boolean;

  items: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home',
    },
    {
      title: 'Posts',
      icon: 'book',
      expanded: false,
      children: [
        {
          title: 'Tags list',
          icon: 'layers',
          url: 'tag/list'

        },
        {
          title: 'Post list',
          url: 'posts/list',
          icon: 'list'
        },
        {
          title: 'Write new Post',
          url: 'posts/new',
          icon: 'plus-outline'
        }

      ]
    },

    {
      title: 'Products',
      icon: 'cube',
      expanded: false,
      children: [
        {
          title: 'Product list',
          icon: 'list',
          url: 'product/list'
        },
        {
          title: 'I have new product',
          icon: 'plus',
          url: 'product/new'
        }
      ]
    },
    {
      title: 'Resume',
      icon: 'book-open-outline',
      expanded: false,
      url: '/resume'

    }

  ];




}
