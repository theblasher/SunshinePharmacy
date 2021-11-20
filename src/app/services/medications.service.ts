import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medications} from "../models/medications";
import {MatDialog} from "@angular/material/dialog";
import {PrescriberMedOrderConfirmDialog} from "../components/prescriber-med-order-confirm-dialog/prescriber-med-order-confirm-dialog";
import {Constants} from "../shared/constants";


@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  SERVER_URL: string = Constants.SERVER_URL + "view.php/";
  public medications !: Medications[];

  public medicationConfirm !: Medications;

  constructor(private http: HttpClient,
              private matDialog: MatDialog) {
  }

  public async getMedications() {
    this.medications = await this.http.get<Medications[]>(this.SERVER_URL).toPromise();
    return this.medications;
  }

  public openPrescriberOrderDialog(element: Medications) {
    this.medicationConfirm = element;
    this.matDialog.open(PrescriberMedOrderConfirmDialog);
  }
}
