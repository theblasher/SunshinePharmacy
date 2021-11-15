import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MedicationsService} from "../../services/medications.service";
import {DatePipe} from "@angular/common";
import {UserInfoService} from "../../services/user-info.service";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'medications-confirm-component',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  medicationConfirmName!: string;
  prescriberLastName!: string;
  officePhoneNumber!: string;
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
    firstName: this.userInfoService.userInfo[0].First_Name,
    lastName: this.userInfoService.userInfo[0].Last_Name,
    medication: new FormControl('', Validators.required),
    medicationType: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)]),
    date: this.datePipe.transform(Date(), 'yyyy-MM-dd'),
    cardNum: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(16)]),
    expirationDate: new FormControl('', Validators.required),
    cvv: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(3)])
  });

  medicationType !: string;

  constructor(private dialogRef: MatDialogRef<CheckoutDialogComponent>,
              private formBuilder: FormBuilder,
              private medService: MedicationsService,
              private orderService: OrderService,
              private datePipe: DatePipe,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.prescriberLastName = this.medService.medicationOrderInformation.prescriberLastName;
    this.officePhoneNumber = this.medService.medicationOrderInformation.officeNumber;
    this.medicationConfirmName = this.medService.medicationConfirm.SubstanceName;
    this.medicationType = this.medService.medicationOrderInformation.type;
  }

  async onSubmit() {
    console.warn('Your order has been submitted', this.checkoutConfirmationForm.value);
    await this.saveData(this.checkoutConfirmationForm.value);
    this.orderService.saveLastFourOfCreditCard(this.checkoutConfirmationForm.value.cardNum)
    this.checkoutConfirmationForm.reset();

    this.dialogRef.close();
  }

  async saveData(values: any) {
    const checkoutData = new FormData();
    checkoutData.append('firstName', values.firstName);
    checkoutData.append('lastName', values.lastName);
    checkoutData.append('medication', values.medication);
    checkoutData.append('medicationType', values.medicationType);
    checkoutData.append('prescriberLastName', this.prescriberLastName);
    checkoutData.append('officePhoneNumber', this.officePhoneNumber);
    checkoutData.append('streetAddress', values.streetAddress);
    checkoutData.append('city', values.city);
    checkoutData.append('state', values.state);
    checkoutData.append('zipCode', values.zipCode);
    checkoutData.append('date', values.date);

    await this.orderService.checkoutSubmission(checkoutData);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
