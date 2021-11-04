import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MedicationsService} from "../../services/medications.service";

@Component({
  selector: 'order-confirm-component',
  templateUrl: './order-confirm-dialog.component.html'
})
export class OrderConfirmDialogComponent implements OnInit {
  medicationName!: string;
  patient: string = "Filler Name";
  cardNum!: string;

  public orderConfirmMessage = "Thank you for your order!";

  color = "primary";

  constructor(private dialogRef: MatDialogRef<OrderConfirmDialogComponent>,
              private medService: MedicationsService) {
  }

  ngOnInit() {
    this.medicationName = this.medService.medicationConfirm.SubstanceName;
    this.cardNum = this.medService.orderInformation.cardNum;
  }

  onSubmit() {
    this.dialogRef.close();
  }

}
