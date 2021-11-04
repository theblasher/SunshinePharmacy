import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medications} from "../models/medications";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MedicationsConfirmDialogComponent} from "../components/medications-confirm-dialog/medications-confirm-dialog.component";
import {CheckoutDialogComponent} from "../components/checkout-dialog/checkout-dialog.component";
import {MedicationsConfirmation} from "../models/medications-confirmation";


@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  SERVER_URL: string = "http://47.197.115.239/view.php/";
  public medications !: Medications[];

  public medicationInformation !: MedicationsConfirmation;

  public medicationConfirm !: Medications;

  constructor(private http: HttpClient,
              private matDialog: MatDialog) {
  }

  public async getMedications() {
    this.medications = await this.http.get<Medications[]>(this.SERVER_URL).toPromise();
    return this.medications;
  }

  public saveMedConfirmation(confirmationMed: MedicationsConfirmation){
        this.medicationInformation = confirmationMed;
  }

  public openConfirmationDialog(element: Medications){
    this.medicationConfirm = element;
    this.matDialog.open(MedicationsConfirmDialogComponent);
  }
}
