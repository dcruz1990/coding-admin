import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service'
import { NbMenuItem } from '@nebular/theme';

import { expand } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService) { }
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
      title: 'Tags',
      icon: 'layers',
      expanded: false,
      children: [
        {
          title: 'Tag list',
          icon: 'list',
          url: 'category'
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
