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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HeaderModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule.forRoot()
  ],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
