import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserInfoService} from "../../services/user-info.service";
import {OrderService} from "../../services/order.service";
import {PrescriptionService} from "../../services/prescription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'order-confirm-component',
  templateUrl: './order-confirm-dialog.component.html'
})
export class OrderConfirmDialogComponent implements OnInit {
  medicationName!: string;
  patient: string = this.userInfoService.userInfo[0].First_Name + " " + this.userInfoService.userInfo[0].Last_Name;
  cardNum!: string;

  public orderConfirmMessage = "Thank you for your order!";

  color = "primary";

  constructor(private dialogRef: MatDialogRef<OrderConfirmDialogComponent>,
              private orderService: OrderService,
              private userInfoService: UserInfoService,
              private prescriptionService: PrescriptionService,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.cardNum);
    this.medicationName = this.prescriptionService.openedPrescription.Medication;
    this.cardNum = this.orderService.cardNum.substr(this.orderService.cardNum.length - 4);
  }

  async onSubmit() {
    this.dialogRef.close();
    await this.router.navigateByUrl('/home');
  }

}
