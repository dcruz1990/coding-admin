import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule } from '@angular/forms'
import { NbDialogService, NbTooltipModule, NbIconModule, NbSelectModule, NbTreeGridModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { ProductDeleteComponent } from './product-list/product-delete/product-delete.component';
import { ProductEditComponent } from './product-list/product-edit/product-edit.component'
@NgModule({
  declarations: [ProductListComponent, ProductAddComponent, ProductDeleteComponent, ProductEditComponent],
  imports: [
    CommonModule,
    NbIconModule,
    NbTooltipModule,
    NbTreeGridModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    NbSelectModule,
    FormsModule
  ],
  exports: [ProductAddComponent, ProductListComponent],
  entryComponents: [ProductDeleteComponent]

})
export class ProductsModule { }
