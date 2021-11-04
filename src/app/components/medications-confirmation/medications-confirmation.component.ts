import {Component, OnInit} from '@angular/core';
import {MedicationsService} from "../../services/medications.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'medications-confirmation-component',
  templateUrl: './medications-confirmation.component.html',
  styleUrls: ['./medications-confirmation.component.css']
})
export class MedicationsConfirmationComponent implements OnInit {
  medicationConfirmName!: string;
  color = "primary";

  confirmationForm = this.formBuilder.group({
    type: '',
    prescriberLastName: '',
    officeNumber: ''
  });

  choices = ["New", "Refill"];

  constructor(private medService: MedicationsService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.medicationConfirmName = this.medService.medicationConfirm.SubstanceName;
  }

  onSubmit(){
    console.warn('Your order has been submitted', this.confirmationForm.value);
  }


  onCancel(){
    this.router.navigate(['/medications'])
  }



}
