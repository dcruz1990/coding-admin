import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PostlistComponent } from './postlist/postlist.component';
import { AddpostComponent } from './addpost/addpost.component';

import { JwPaginationComponent } from 'jw-angular-pagination';

import { FormsModule } from '@angular/forms'

// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ckeditor4-angular';

import { NbSelectModule, NbBadgeModule, NbIconModule, NbTreeGridModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { EditPostComponent } from './postlist/edit-post/edit-post.component';
import { DeletePostComponent } from './postlist/delete-post/delete-post.component'

@NgModule({
  declarations: [PostlistComponent, AddpostComponent, EditPostComponent, DeletePostComponent, JwPaginationComponent],
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
    NbSpinnerModule,
    NbSelectModule
  ],
  exports: [PostlistComponent],
  entryComponents: [EditPostComponent, DeletePostComponent]
})
export class PostModule { }
