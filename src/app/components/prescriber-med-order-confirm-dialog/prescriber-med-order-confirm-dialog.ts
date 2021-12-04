import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MedicationsService} from "../../services/medications.service";
import {UserInfoService} from "../../services/user-info.service";
import {EncryptionService} from "../../services/encryption.service";
import {PrescriptionService} from "../../services/prescription.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'medications-confirm-component',
  templateUrl: './prescriber-med-order-confirm-dialog.html',
  styleUrls: ['./prescriber-med-order-confirm-dialog.component.css']
})
export class PrescriberMedOrderConfirmDialog implements OnInit {
  medicationName = this.medService.medicationConfirm.ProprietaryName;
  color = "primary";
  confirmationForm!: FormGroup;

  prescriberFirstName = this.userInfoService.userInfo[0].First_Name
  prescriberLastName = this.userInfoService.userInfo[0].Last_Name
  prescriberID = this.userInfoService.userInfo[0].ID

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
              private userInfoService: UserInfoService,
              private encryptionService: EncryptionService,
              private prescriptionService: PrescriptionService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.confirmationForm = this.formBuilder.group({
      medication: this.medService.medicationConfirm.ProprietaryName,
      medicationQuantity: new FormControl('', Validators.required),
      medicationFrequency: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      prescriberID: this.prescriberID,
      prescriberFirstName: this.prescriberFirstName,
      prescriberLastName: this.prescriberLastName,
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientStreet: new FormControl('', Validators.required),
      patientCity: new FormControl('', Validators.required),
      patientState: new FormControl('', Validators.required),
      patientZipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)]),
      patientDOB: new FormControl('', Validators.required),
      datePrescribed: <string>this.datePipe.transform(Date(), 'yyyy-MM-dd')
    });
  }

  async onSubmit() {
    this.confirmationForm.setValue({
      medication: this.encryptionService.encrypt(this.confirmationForm.value.medication),
      medicationQuantity: this.encryptionService.encrypt(this.confirmationForm.value.medicationQuantity),
      medicationFrequency: this.encryptionService.encrypt(this.confirmationForm.value.medicationFrequency),
      type: this.encryptionService.encrypt(this.confirmationForm.value.type),
      prescriberFirstName: this.encryptionService.encrypt(this.prescriberFirstName),
      prescriberID: this.encryptionService.encrypt(this.prescriberID.toString()),
      prescriberLastName: this.encryptionService.encrypt(this.prescriberLastName),
      patientFirstName: this.encryptionService.encrypt(this.confirmationForm.value.patientFirstName),
      patientLastName: this.encryptionService.encrypt(this.confirmationForm.value.patientLastName),
      patientStreet: this.encryptionService.encrypt(this.confirmationForm.value.patientStreet),
      patientCity: this.encryptionService.encrypt(this.confirmationForm.value.patientCity),
      patientState: this.encryptionService.encrypt(this.confirmationForm.value.patientState),
      patientZipCode: this.encryptionService.encrypt(this.confirmationForm.value.patientZipCode),
      patientDOB: this.encryptionService.encrypt(this.confirmationForm.value.patientDOB),
      datePrescribed: this.encryptionService.encrypt(this.confirmationForm.value.datePrescribed)

    });
    console.warn('Your order has been submitted', this.confirmationForm.value);
    await this.prescriptionService.savePrescriptionInfo(this.confirmationForm.value);
    this.confirmationForm.reset();

    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
