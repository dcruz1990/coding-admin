import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[]

  spinner = false;

  constructor(private productSetvice: ProductService, private user: UserService) { }

  ngOnInit() {
    this.spinner = true
    this.productSetvice.getProducts(this.user.getCurrentUserId()).subscribe((data) => {
      this.products = data
      this.spinner = false
    }, error => {
      console.log(error)
    })


  }

}
