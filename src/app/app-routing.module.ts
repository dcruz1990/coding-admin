import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component'

import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,

} from '@nebular/auth';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'auth',
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     }

  //   ]
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'auth/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
