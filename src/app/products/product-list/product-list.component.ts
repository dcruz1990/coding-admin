import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { NbDialogService } from '@nebular/theme'
import { ProductDeleteComponent } from './product-delete/product-delete.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @ViewChild('dialogDelete', { static: true }) dialogRef: TemplateRef<any>;

  test = {
    name: 'test',
    id: 1
  }

  products: Product[]

  spinner = false;
  deleteSpinner = false;

  constructor(private dialog: NbDialogService, private productSetvice: ProductService, private user: UserService) { }

  ngOnInit() {
    this.spinner = true
    this.productSetvice.getProducts(this.user.getCurrentUserId()).subscribe((data) => {
      this.products = data
      this.spinner = false
    }, error => {
      console.log(error)
    })

  }

  openDeleteDialog(dialog: TemplateRef<any>, product: Object) {
    this.dialog.open(dialog, { context: product, closeOnBackdropClick: true })
  }

  deleteItem(data: Product) {
    this.deleteSpinner = true
    console.log("test")
    console.log(data)
  }


}
