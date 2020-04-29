import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { NbDialogService } from '@nebular/theme'
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @ViewChild('dialogDelete', { static: true }) dialogRef: TemplateRef<any>;

  product: any

  test = {
    name: 'test',
    id: 1
  }

  products: Product[]

  spinner = false;


  constructor(private route: Router, private toast: AlertService, private dialog: NbDialogService, private productService: ProductService, private user: UserService) { }

  ngOnInit() {
    this.spinner = true
    this.productService.getProducts(this.user.getCurrentUserId()).subscribe((data) => {
      if (data.length > 0) {
        this.products = data
        this.spinner = false
      } else {
        this.toast.showToast('top-right', 'info', 'Theres no products here :(', 'Cant find any product')
      }
    }, error => {
      this.spinner = false
      this.toast.showToast('top-right', 'info', 'Theres no products here :(', 'Cant find any product')
    })
  }

  goToAddProduct() {
    this.route.navigate(['product/new'])
  }

  // Using dialog in a component
  openDeleteDialog(productToDelete: Object) {
    this.dialog.open(ProductDeleteComponent, {
      context: {
        product: productToDelete
      }, closeOnBackdropClick: true
    }).onClose.subscribe((data) => {
      this.spinner = true;
      if (data) {
        if (data.status === 404) {
          this.spinner = false
          this.products = []
          this.toast.showToast('top-right', 'info', 'Theres no products here :(', 'Cant find any product')
        } else {
          this.productService.updatedProduct.subscribe((result) => {
            if (result) {

              this.products = result
              this.spinner = false;
            }
          })
        }
        if (data === 'closed') {
          this.productService.getProducts(this.user.getCurrentUserId()).subscribe((result) => {
            this.products = result
          }
          )
        }
      }
    });
  }

  openEditDialog(productToEdit: Object) {
    this.dialog.open(ProductEditComponent, {
      context: {
        product: productToEdit
      }, closeOnBackdropClick: false
    })
    // .onClose.subscribe((data) => {
    // });
  }

}



