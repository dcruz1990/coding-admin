import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/models/Requirement';
import { AlertService } from 'src/app/services/alert.service';
import { NbDialogRef } from '@nebular/theme';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-requirement-add',
  templateUrl: './requirement-add.component.html',
  styleUrls: ['./requirement-add.component.scss']
})
export class RequirementAddComponent implements OnInit {


  newReq: Requirement = {
    description: '',
    id: '',
  }

  constructor(private alert: AlertService, protected dialogRef: NbDialogRef<any>, private productService: ProductService) { }

  ngOnInit() {
  }

  newRequirement() {
    console.log(this.newReq)
    this.productService.addRequirement(this.newReq).subscribe((result) => {
      this.dialogRef.close(result)
      this.alert.showToast('top-right', 'success', 'Done', 'Your tag was added!')
      console.log("ok")
    }, error => {
      console.log("error")
    })
  }
}
