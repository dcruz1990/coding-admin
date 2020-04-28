import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PostlistComponent } from './postlist/postlist.component';
import { AddpostComponent } from './addpost/addpost.component';

import { FormsModule } from '@angular/forms'

// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ckeditor4-angular';

import { NbBadgeModule, NbIconModule, NbTreeGridModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { EditPostComponent } from './postlist/edit-post/edit-post.component';
import { DeletePostComponent } from './postlist/delete-post/delete-post.component'

@NgModule({
  declarations: [PostlistComponent, AddpostComponent, EditPostComponent, DeletePostComponent],
  imports: [
    CommonModule,
    NbBadgeModule,
    NbTreeGridModule,
    NbIconModule,
    NbCardModule,
    CKEditorModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule
  ],
  exports: [PostlistComponent],
  entryComponents: [EditPostComponent, DeletePostComponent]
})
export class PostModule { }
