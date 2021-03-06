import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component'


import { ProfileComponent } from './profile/profile.component';
import { LoginResolver } from './resolvers/loginResolver';
import { PostlistComponent } from './post/postlist/postlist.component';
import { AddpostComponent } from './post/addpost/addpost.component'
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductListComponent } from './products/product-list/product-list.component';

import { ResumeComponent } from './resume/resume.component'
import { TaglistComponent } from './post/taglist/taglist.component';



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
  {
    path: 'posts/new',
    component: AddpostComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'product/list',
    component: ProductListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'tag/list',
    component: TaglistComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'product/new',
    component: ProductAddComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'resume',
    component: ResumeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginResolver]
})
export class AppRoutingModule { }
