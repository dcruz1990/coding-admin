import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,

} from '@nebular/auth';


const routes: Routes = [

  // { path: '', component: LoginComponent },


  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },

      {
        path: 'logout',
        component: NbLogoutComponent,
      },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
