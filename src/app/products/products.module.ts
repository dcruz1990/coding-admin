import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { FormsModule } from '@angular/forms'
import { NbTooltipModule, NbIconModule, NbSelectModule, NbTreeGridModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme'
@NgModule({
  declarations: [ProductListComponent, ProductAddComponent],
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
  exports: [ProductAddComponent, ProductListComponent]
})
export class ProductsModule { }
