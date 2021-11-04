import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medications} from "../models/medications";
import {MatDialog} from "@angular/material/dialog";
import {MedicationsConfirmDialogComponent} from "../components/medications-confirm-dialog/medications-confirm-dialog.component";
import {MedicationsConfirmation} from "../models/medications-confirmation";
import {OrderConfirmation} from "../models/order-confirmation";


@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  SERVER_URL: string = "http://47.197.115.239/view.php/";
  public medications !: Medications[];

  public medicationInformation !: MedicationsConfirmation;
  public orderInformation !: OrderConfirmation;

  public medicationConfirm !: Medications;

  constructor(private http: HttpClient,
              private matDialog: MatDialog) {
  }

  public async getMedications() {
    this.medications = await this.http.get<Medications[]>(this.SERVER_URL).toPromise();
    return this.medications;
  }

  public saveMedConfirmation(confirmationMed: MedicationsConfirmation) {
    this.medicationInformation = confirmationMed;
  }

  public saveOrderConfirmation(orderConfirmation: OrderConfirmation) {
    this.orderInformation = orderConfirmation;
  }

  public openConfirmationDialog(element: Medications) {
    this.medicationConfirm = element;
    this.matDialog.open(MedicationsConfirmDialogComponent);
  }
}
