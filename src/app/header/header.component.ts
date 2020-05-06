import { Component, OnInit, Input } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, } from '@nebular/theme';



import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
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

  @Input() messageRecived: string

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
    this.currentUser = this.auth.getUser()

  }


  ngOnInit() {


    this.user.getUser(this.user.getCurrentUserId()).pipe(takeUntil(this.destroy$)).subscribe((user: any) => this.currentUser = user)

    // // Subscribe to login status
    this.auth.currentLoginStatus.subscribe(status => this.isLoggedIn = status)

    // // Subscribe to changes when update user
    // this.auth.currentUser.subscribe(user => this.currentUser = user)

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

