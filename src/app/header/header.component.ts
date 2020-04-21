import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, } from '@nebular/theme';



import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  userPictureOnly = false;

  logedIn = false;

  user: any = {}
  userMainPhoto: any = {}

  userMenu = [{ title: 'Profile', icon: 'person' }, { title: 'Log out', icon: 'power-outline' }];

  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private userService: UserService,

  ) {

    // this.authService.onTokenChange()
    //   .subscribe((token: NbAuthJWTToken) => {

    //     if (token.isValid()) {
    //       this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
    //     }
    //   });

  }

  ngOnInit() {


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
    this.sidebarService.toggle(true, 'menu-sidebar')
    // this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome()
    return false;
  }

  // logout() {
  //   this.authService.logout('email')
  // }

}
