import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { NbActionsModule, NbUserModule, NbIconModule, NbSearchModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    NbSearchModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
