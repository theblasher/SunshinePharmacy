import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MedicationsService} from "../../services/medications.service";
import {UserInfoService} from "../../services/user-info.service";
import {OrderService} from "../../services/order.service";

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
              private medService: MedicationsService,
              private orderService: OrderService,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.medicationName = this.medService.medicationConfirm.SubstanceName;
    this.cardNum = this.orderService.cardNum;
  }

  onSubmit() {
    this.dialogRef.close();
  }

}
