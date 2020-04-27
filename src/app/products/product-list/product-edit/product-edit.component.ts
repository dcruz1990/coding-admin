import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NbDialogRef } from '@nebular/theme';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  editSpinner = false


  @Input() product: any

  deleteSpinner = false;

  constructor(private user: UserService, protected dialogRef: NbDialogRef<any>, private productService: ProductService, private toast: AlertService) { }

  ngOnInit() {

  }

  editItem(id: number, product: any) {
    this.editSpinner = true
    this.productService.editProduct(id, product).subscribe(result => {
      this.editSpinner = false
      this.toast.showToast('bottom-left', 'info', 'Update ok', 'Your product has been updated!')
      this.productService.getProducts(this.user.getCurrentUserId()).subscribe((data) => {
        let postslenght
        postslenght = data.length
        this.dialogRef.close(postslenght)
      }, err => {
        const myerr = err
        this.dialogRef.close(myerr)
      })
      this.dialogRef.close()

    })

  }
}
