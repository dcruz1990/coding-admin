import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
import { PostService } from './services/post.service'
import { ErrorInterceptorService } from './services/error-interceptor.service'

import { NgxUploaderModule } from 'ngx-uploader';
// import { FileSelectDirective } from 'ng2-file-upload';

import { FileUploadModule } from "ng2-file-upload";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbSidebarService, NbWindowModule, NbSidebarModule, NbThemeModule, NbSpinnerModule, NbUserModule, NbRadioModule, NbDialogModule,
  NbLayoutModule, NbButtonModule, NbCheckboxModule, NbMenuService, NbMenuModule, NbCardModule, NbInputModule, NbAlertModule, NbIconModule, NbToastrModule,
} from '@nebular/theme';



import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HeaderModule } from './header/header.module';
import { PostModule } from './post/post.module'
import { ProductsModule } from './products/products.module'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


import { ProfileComponent } from './profile/profile.component';
import { PhotoaddComponent } from './profile/photoadd/photoadd.component';
import { ResumeComponent } from './resume/resume.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PhotoaddComponent,
    ResumeComponent,

  ],
  imports: [
    BrowserModule,
    NbRadioModule,
    ProductsModule,
    PostModule,
    NgxUploaderModule,
    FileUploadModule,
    NbUserModule,
    NbLayoutModule,
    NbWindowModule.forRoot(),
    NbDialogModule.forChild(),
    NbToastrModule.forRoot(),
    AppRoutingModule,
    NbEvaIconsModule,
    HeaderModule,
    NbInputModule,
    NbSidebarModule,
    NbButtonModule,
    HttpClientModule,
    NbCardModule,
    NbIconModule,
    NbAlertModule,
    NbCheckboxModule,
    FormsModule,
    NbSpinnerModule,
    NbMenuModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  providers:
    [
      // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
      NbSidebarService, NbMenuService, AuthGuardService, AuthService, UserService, PostService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoaddComponent, ProfileComponent]
})

export class AppModule { }
