import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MedicationsService} from "../../services/medications.service";
import {OrderConfirmDialogComponent} from "../order-confirm-dialog/order-confirm-dialog.component";

@Component({
  selector: 'medications-confirm-component',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  medicationConfirmName!: string;
  color = "primary";

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  checkoutConfirmationForm = this.formBuilder.group({
    medication: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)]),
    cardNum: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(16)]),
    expirationDate: new FormControl('', Validators.required),
    cvv: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3)])
  });

  medicationType !: string;

  constructor(private dialogRef: MatDialogRef<CheckoutDialogComponent>,
              private formBuilder: FormBuilder,
              private medService: MedicationsService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.medicationConfirmName = this.medService.medicationConfirm.SubstanceName;
    this.medicationType = this.medService.medicationInformation.type;
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.checkoutConfirmationForm.value);
    this.medService.saveOrderConfirmation(this.checkoutConfirmationForm.value);
    this.checkoutConfirmationForm.reset();

    this.dialogRef.close();

    this.matDialog.open(OrderConfirmDialogComponent);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
