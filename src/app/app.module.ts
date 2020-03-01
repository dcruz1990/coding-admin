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

import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          baseEndpoint: 'http://localhost:5000',
          login: {
            endpoint: '/api/auth/login',
          },
          register: {
            endpoint: '/api/auth/register',
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
