import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';


const routes: Routes = [

  { path: 'auth/login', component: NbLoginComponent },
  { path: 'auth/register', component: NbRegisterComponent },
  { path: 'auth/logout', component: NbLogoutComponent },
  { path: 'auth/request-password', component: NbRequestPasswordComponent },
  { path: 'auth/reset-password', component: NbResetPasswordComponent },

  // {
  //   path: 'auth',
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'login',
  //       component: NbLoginComponent,
  //     },

  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     },

  //   ],
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
