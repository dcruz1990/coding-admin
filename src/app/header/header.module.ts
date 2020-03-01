import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { NbActionsModule, NbUserModule, NbIconModule, NbSearchModule, NbMenuModule, NbContextMenuModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    NbSearchModule,
    NbMenuModule,
    NbContextMenuModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
