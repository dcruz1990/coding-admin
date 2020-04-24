import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostlistComponent } from './postlist/postlist.component';
import { AddpostComponent } from './addpost/addpost.component';

import { NbTreeGridModule, NbCardModule } from '@nebular/theme'

@NgModule({
  declarations: [PostlistComponent, AddpostComponent],
  imports: [
    CommonModule,
    NbTreeGridModule,
    NbCardModule
  ],
  exports: [PostlistComponent]
})
export class PostModule { }
