import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbSidebarService, NbSidebarModule, NbThemeModule,
  NbLayoutModule, NbButtonModule, NbCheckboxModule, NbMenuService, NbMenuModule, NbCardModule, NbInputModule, NbAlertModule, NbIconModule,
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HeaderModule } from './header/header.module';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NbLayoutModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: 'http://localhost:5050',
          login: {
            endpoint: '/api/auth/login',
            method: 'post',
            redirect: {
              success: '/profile',
              failure: null, // stay on the same page
            }
          },
          register: {
            endpoint: '/api/auth/register',
            method: 'post',
          },

        }),
      ],
      forms: {},
    }),
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
    NbMenuModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})

export class AppModule { }
