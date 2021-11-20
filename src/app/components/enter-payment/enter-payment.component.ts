import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {PrescriptionService} from "../../services/prescription.service";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'enter-payment-component',
  templateUrl: './enter-payment.component.html',
  styleUrls: ['./enter-payment.component.css']
})
export class EnterPaymentComponent implements OnInit {
  medicationName !: string;
  prescriber !: string;
  paymentForm = this.formBuilder.group({
    cardNum: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(16)]),
    expirationDate: new FormControl('', Validators.required),
    cvv: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3)]),
    dateOrdered: this.datePipe.transform(Date(), 'yyyy-MM-dd')
  })

  constructor(private dialogRef: MatDialogRef<EnterPaymentComponent>,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private prescriptionService: PrescriptionService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.medicationName = this.prescriptionService.openedPrescription.Medication;
    this.prescriber = this.prescriptionService.openedPrescription.Prescriber_First_Name + " " +
      this.prescriptionService.openedPrescription.Prescriber_Last_Name;
  }

  async onSubmit() {
    console.warn('Your order has been submitted', this.paymentForm.value);
    this.dialogRef.close();
    await this.orderService.saveLastFourOfCreditCard(this.paymentForm.value.cardNum);
    await this.orderService.checkoutSubmission(this.orderService.orderInformation);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
