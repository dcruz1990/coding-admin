import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, } from '@nebular/theme';



import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service'
import { Router } from '@angular/router';
import { User } from '../models/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  userPictureOnly = false;

  userPhotos: any

  avatarUrl: any

  isLoggedIn = false

  currentUser: any

  userMenu = [{ title: 'Profile', icon: 'person' }, { title: 'Log out', icon: 'power-outline' }];

  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private toast: AlertService

  ) {

  }


  ngOnInit() {

    this.auth.currentLoginStatus.subscribe(status => this.isLoggedIn = status)

    this.currentUser = JSON.parse(localStorage.getItem('user'))

    this.userPhotos = this.currentUser.photos

    this.avatarUrl = this.userPhotos.filter(photo => photo.isMain === true)[0].url

    this.isLoggedIn = this.auth.loggedIn()

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
      this.logout()

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


  logout() {
    this.auth.logout()
    this.toast.showToast('bottom-left', 'info', 'See you soon!', 'You have sucefully logout')
    this.router.navigate(['/'])
  }

}

