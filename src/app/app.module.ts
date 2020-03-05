import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbSidebarService, NbSidebarModule, NbThemeModule,
  NbLayoutModule, NbButtonModule, NbMenuService, NbMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HeaderModule } from './header/header.module';

import { HttpClientModule } from '@angular/common/http';

import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken, } from '@nebular/auth';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:5050',
          login: {
            endpoint: '/api/auth/login',
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
        }),

      ],
      forms: {},
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HeaderModule,

    NbSidebarModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    HttpClientModule,


  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
