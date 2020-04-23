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
  NbSidebarService, NbWindowModule, NbSidebarModule, NbThemeModule, NbSpinnerModule, NbUserModule, NbRadioModule, NbDialogModule,
  NbLayoutModule, NbButtonModule, NbCheckboxModule, NbMenuService, NbMenuModule, NbCardModule, NbInputModule, NbAlertModule, NbIconModule, NbToastrModule,
} from '@nebular/theme';



import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HeaderModule } from './header/header.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


import { ProfileComponent } from './profile/profile.component';
import { PhotoaddComponent } from './profile/photoadd/photoadd.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PhotoaddComponent
  ],
  imports: [
    BrowserModule,
    NbRadioModule,
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
      NbSidebarService, NbMenuService, AuthGuardService, AuthService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [PhotoaddComponent, ProfileComponent]
})

export class AppModule { }
