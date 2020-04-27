import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { NbDialogService } from '@nebular/theme'
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';


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
    console.log("me inicio")
    this.spinner = true
    this.productService.getProducts(this.user.getCurrentUserId()).subscribe((data) => {
      if (data.length > 0) {
        this.products = data
        this.spinner = false
      } else {
        console.log("vacio")
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
          this.productService.updatedPost.subscribe((result) => {
            if (result) {
              console.log(result)
              this.products = result
              this.spinner = false;
            }
          })
        }
      }
    });
  }

}



