import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service'
import { ErrorInterceptorService } from './services/error-interceptor.service'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbSidebarService, NbSidebarModule, NbThemeModule, NbSpinnerModule, NbUserModule, NbRadioModule,
  NbLayoutModule, NbButtonModule, NbCheckboxModule, NbMenuService, NbMenuModule, NbCardModule, NbInputModule, NbAlertModule, NbIconModule, NbToastrModule,
} from '@nebular/theme';



import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HeaderModule } from './header/header.module';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NbRadioModule,
    NbUserModule,
    NbLayoutModule,
    NbToastrModule.forRoot(),
    // NbAuthModule.forRoot({
    //   strategies: [
    //     NbPasswordAuthStrategy.setup({
    //       name: 'email',
    //       token: {
    //         class: NbAuthJWTToken,
    //         key: 'token',
    //       },
    //       baseEndpoint: 'http://localhost:5050',
    //       login: {
    //         endpoint: '/api/auth/login',
    //         method: 'post',
    //         redirect: {
    //           success: '/profile',
    //           failure: null, // stay on the same page
    //         }
    //       },
    //       register: {
    //         endpoint: '/api/auth/register',
    //         method: 'post',
    //       },

    //     }),
    //   ],
    //   forms: {},
    // }),
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
  providers: [NbSidebarService, NbMenuService, AuthGuardService, AuthService, UserService, ErrorInterceptorService],
  bootstrap: [AppComponent]
})

export class AppModule { }
