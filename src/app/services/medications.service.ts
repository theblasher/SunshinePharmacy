import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medications} from "../models/medications";
import {MatDialog} from "@angular/material/dialog";
import {PrescriberMedOrderConfirmDialog} from "../components/prescriber-med-order-confirm-dialog/prescriber-med-order-confirm-dialog";
import {MedicationsConfirmation} from "../models/medications-confirmation";
import {OrderConfirmation} from "../models/order-confirmation";
import {Constants} from "../shared/constants";


@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  SERVER_URL: string = Constants.SERVER_URL + "view.php/";
  public medications !: Medications[];

  public medicationOrderInformation !: MedicationsConfirmation;
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
    this.medicationOrderInformation = confirmationMed;
  }

  public openConfirmationDialog(element: Medications) {
    this.medicationConfirm = element;
    this.matDialog.open(PrescriberMedOrderConfirmDialog);
  }
}
