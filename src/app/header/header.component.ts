import { Component, OnInit } from '@angular/core';

import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';



import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  userPictureOnly = false;

  user: any;
  test: any;

  userMenu = [{ title: 'Profile', icon: 'person', }, { title: 'Log out', icon: 'power-outline' }];


  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private auth: AuthService

  ) {
  }

  ngOnInit() {
    let logedin;

    logedin = this.auth.LoggedIn();

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });





    const { xl } = this.breakpointService.getBreakpointsMap();

    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    // this.authService.onTokenChange()
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if (token.isValid()) {
    //       this.user = token.getPayload();
    //       console.log(token);
    //     }
    //   });



  }


  onItemSelection(title) {
    if (title === 'Log out') {
      // Do something on Log out

    } else if (title === 'Profile') {
      // Do something on Profile
      console.log('Profile Clicked ');
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

}
