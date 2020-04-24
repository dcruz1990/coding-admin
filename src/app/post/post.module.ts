import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostlistComponent } from './postlist/postlist.component';
import { AddpostComponent } from './addpost/addpost.component';

import { FormsModule } from '@angular/forms'

// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ckeditor4-angular';

import { NbTreeGridModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme'

@NgModule({
  declarations: [PostlistComponent, AddpostComponent],
  imports: [
    CommonModule,
    NbTreeGridModule,
    NbCardModule,
    CKEditorModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule
  ],
  exports: [PostlistComponent]
})
export class PostModule { }
