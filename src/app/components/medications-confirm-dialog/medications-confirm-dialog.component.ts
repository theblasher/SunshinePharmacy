import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MedicationsService} from "../../services/medications.service";
import {CheckoutDialogComponent} from "../checkout-dialog/checkout-dialog.component";

@Component({
  selector: 'medications-confirm-component',
  templateUrl: './medications-confirm-dialog.component.html'
})
export class MedicationsConfirmDialogComponent implements OnInit{
  medicationConfirmName!: string;
  color = "primary";
  confirmationForm!: FormGroup;

  choices = ["New", "Refill"];

  constructor(private dialogRef: MatDialogRef<MedicationsConfirmDialogComponent>,
              private matDialog: MatDialog,
              private formBuilder: FormBuilder,
              private medService: MedicationsService) {
  }

  ngOnInit() {
    this.confirmationForm = this.formBuilder.group({
      type: new FormControl('', Validators.required),
      prescriberLastName: new FormControl('', Validators.required),
      officeNumber: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    });

    this.medicationConfirmName = this.medService.medicationConfirm.SubstanceName;
  }

  onSubmit(){
    console.warn('Your order has been submitted', this.confirmationForm.value);
    this.medService.saveMedConfirmation(this.confirmationForm.value);
    this.confirmationForm.reset();

    this.dialogRef.close();

    this.matDialog.open(CheckoutDialogComponent);
  }

  onCancel(){
    this.dialogRef.close();
  }

}
