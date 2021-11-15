import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MedicationsService} from "../../services/medications.service";
import {CheckoutDialogComponent} from "../checkout-dialog/checkout-dialog.component";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'medications-confirm-component',
  templateUrl: './prescriber-med-order-confirm-dialog.html',
  styleUrls: ['./prescriber-med-order-confirm-dialog.component.css']
})
export class PrescriberMedOrderConfirmDialog implements OnInit {
  medicationName!: string;
  color = "primary";
  confirmationForm!: FormGroup;

  prescriberFirstName = this.userInfoService.userInfo[0].First_Name
  prescriberLastName = this.userInfoService.userInfo[0].Last_Name

  choices = ["New", "Refill"];

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

  constructor(private dialogRef: MatDialogRef<PrescriberMedOrderConfirmDialog>,
              private matDialog: MatDialog,
              private formBuilder: FormBuilder,
              private medService: MedicationsService,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.confirmationForm = this.formBuilder.group({
      medication: this.medicationName,
      type: new FormControl('', Validators.required),
      prescriberFirstName: this.prescriberFirstName,
      prescriberLastName: this.prescriberLastName,
      officeNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientStreet: new FormControl('', Validators.required),
      patientCity: new FormControl('', Validators.required),
      patientState: new FormControl('', Validators.required),
      patientZipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)]),
      patientDOB: new FormControl('', Validators.required)
    });

    this.medicationName = this.medService.medicationConfirm.SubstanceName;
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.confirmationForm.value);
    // this.medService.saveMedConfirmation(this.confirmationForm.value);
    this.confirmationForm.reset();

    this.dialogRef.close();

    // this.matDialog.open(CheckoutDialogComponent);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
