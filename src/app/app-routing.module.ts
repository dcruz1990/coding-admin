import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component'


import { ProfileComponent } from './profile/profile.component';
import { LoginResolver } from './resolvers/loginResolver';
import { PostlistComponent } from './post/postlist/postlist.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    resolve: { loginStatus: LoginResolver }

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'posts/list',
    component: PostlistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],

  },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginResolver]
})
export class AppRoutingModule { }
