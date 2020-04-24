import { Component, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, } from '@nebular/theme';



import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  userPictureOnly = false;

  avatarUrl: any

  isLoggedIn = false

  currentUser: any

  userMenu = [{ title: 'Profile', icon: 'person' }, { title: 'Log out', icon: 'power-outline' }];

  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private user: UserService,
    private auth: AuthService,
    private router: Router,
    private toast: AlertService

  ) {

  }


  ngOnInit() {

    this.avatarUrl = this.user.getCurrentUserPohotos().filter(p => p.isMain === true)[0].url

    // Subscribe to login status
    this.auth.currentLoginStatus.subscribe(status => this.isLoggedIn = status)

    // Read current user form localstorage
    // this.currentUserName = this.user.getCurrentUser().fullName

    // Subscribe to changes when update user 
    this.auth.currentUser.subscribe(user => this.currentUser = user)

    this.currentUser = JSON.parse(localStorage.getItem('data'))
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

