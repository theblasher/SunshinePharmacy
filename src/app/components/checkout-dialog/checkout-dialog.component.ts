import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MedicationsService} from "../../services/medications.service";
import {UserInfoService} from "../../services/user-info.service";
import {OrderService} from "../../services/order.service";
import {PrescriptionService} from "../../services/prescription.service";
import {EncryptionService} from "../../services/encryption.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'medications-confirm-component',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CheckoutDialogComponent implements OnInit {
  medicationName!: string;
  medicationID!: number;
  prescriberName!: string;
  medicationQuantity!: string;
  medicationFrequency!: string;
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
    streetAddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)])
  });

  medicationType !: string;

  constructor(private dialogRef: MatDialogRef<CheckoutDialogComponent>,
              private formBuilder: FormBuilder,
              private medService: MedicationsService,
              private orderService: OrderService,
              private snackbarService: SnackbarService,
              private userInfoService: UserInfoService,
              private prescriptionService: PrescriptionService,
              private encryptionService: EncryptionService) {
  }

  ngOnInit() {
    this.medicationName = this.prescriptionService.openedPrescription.Medication;
    this.medicationID = this.prescriptionService.openedPrescription.ID;
    this.medicationType = this.prescriptionService.openedPrescription.Medication_Type;
    this.prescriberName = this.prescriptionService.openedPrescription.Prescriber_First_Name + " " + this.prescriptionService
      .openedPrescription.Prescriber_Last_Name;
    this.medicationQuantity = this.prescriptionService.openedPrescription.Medication_Quantity;
    this.medicationFrequency = this.prescriptionService.openedPrescription.Medication_Frequency;
  }

  async buildFormDataForCheckoutValidation() {
    const userInfoData = new FormData();
    userInfoData.append('streetAddress', this.encryptionService.encrypt(this.checkoutConfirmationForm.value.streetAddress));
    userInfoData.append('id', this.medicationID.toString());
    userInfoData.append('city', this.encryptionService.encrypt(this.checkoutConfirmationForm.value.city));
    userInfoData.append('patientDOB', this.encryptionService.encrypt(this.userInfoService.userInfo[0].DOB));
    userInfoData.append('state', this.encryptionService.encrypt(this.checkoutConfirmationForm.value.state));
    userInfoData.append('zipCode', this.encryptionService.encrypt(this.checkoutConfirmationForm.value.zipCode));
    return userInfoData;
  }

  async onSubmit() {
    console.warn('Your order has been submitted', this.checkoutConfirmationForm.value);
    let isValidated = await this.orderService.validateOrder(await this.buildFormDataForCheckoutValidation());
    if (!isValidated) {
      this.snackbarService.openSnackBarOrderConfirmationFailed();
    } else if (isValidated) {
      this.orderService.orderInformation.ordererID = this.userInfoService.userInfo[0].ID;
      this.orderService.orderInformation.firstName = this.userInfoService.userInfo[0].First_Name;
      this.orderService.orderInformation.lastName = this.userInfoService.userInfo[0].Last_Name;
      this.orderService.orderInformation.medication = this.prescriptionService.openedPrescription.Medication;
      this.orderService.orderInformation.medicationType = this.prescriptionService.openedPrescription.Medication_Type;
      this.orderService.orderInformation.prescriberLastName = this.prescriptionService.openedPrescription.Prescriber_Last_Name;
      this.orderService.orderInformation.streetAddress = this.checkoutConfirmationForm.value.streetAddress;
      this.orderService.orderInformation.city = this.checkoutConfirmationForm.value.city;
      this.orderService.orderInformation.state = this.checkoutConfirmationForm.value.state;
      this.orderService.orderInformation.zipCode = this.checkoutConfirmationForm.value.state;
      this.checkoutConfirmationForm.reset();
      this.orderService.openOrderConfirmation();
    }
    // await this.saveData(this.checkoutConfirmationForm.value);
    // this.orderService.saveLastFourOfCreditCard(this.checkoutConfirmationForm.value.cardNum)
    // this.checkoutConfirmationForm.reset();
    this.dialogRef.close();
  }

  async saveData(values: any) {
    const confirmInformation = new FormData();
    confirmInformation.append('id', this.medicationID.toString());
    confirmInformation.append('streetAddress', values.streetAddress);
    confirmInformation.append('city', values.city);
    confirmInformation.append('state', values.state);
    confirmInformation.append('zipCode', values.zipCode);

    // await this.orderService.checkoutSubmission(confirmInformation);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
