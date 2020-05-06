import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  spinner = false

  selected: any

  productaddSpinner = false

  forUser: number

  product: Product = {
    name: '',
    productDescription: '',
    url: '',
    type: '',
    userId: 0
  }

  constructor(
    private route: Router,
    private productService: ProductService, private user: UserService, private toast: AlertService) { }

  ngOnInit() {
    this.product.userId = this.user.getCurrentUserId()
  }

  newProduct() {
    this.spinner = true
    if (this.product.type === '') {
      this.spinner = false
      this.toast.showToast('top-right', 'danger', "You have to provide a type for your product", 'Please select a product type')
    } else {
      this.productService.addProduct(this.product).subscribe(
        value => {
          this.spinner = false;
          this.toast.showToast('bottom-left', 'success', 'Product Added!', 'Your product was succefully added')
          this.route.navigate(['/product/list'])
        },
        error => {
          this.spinner = false;
          this.toast.showToast('top-right', 'danger', 'There was an error', error.status + ' ' + error.statusText)
        }
      );
    }

  }

}
