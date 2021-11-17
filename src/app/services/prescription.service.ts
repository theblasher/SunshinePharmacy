import {Injectable} from "@angular/core";
import {OrderConfirmDialogComponent} from "../components/order-confirm-dialog/order-confirm-dialog.component";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../shared/constants";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  SUBMIT_PRESCRIPTION_SERVER_URL: string = Constants.SERVER_URL + "insertprescription.php/";
  constructor(private http: HttpClient,
              private snackbarService: SnackbarService) {
  }

  async savePrescriptionInfo(values: any) {
    const prescriptionData = new FormData();
    prescriptionData.append('medication', values.medication);
    prescriptionData.append('medicationQuantity', values.medicationQuantity);
    prescriptionData.append('medicationFrequency', values.medicationFrequency);
    prescriptionData.append('type', values.type);
    prescriptionData.append('prescriberFirstName',values.prescriberFirstName);
    prescriptionData.append('prescriberLastName', values.prescriberLastName);
    prescriptionData.append('patientFirstName', values.patientFirstName);
    prescriptionData.append('patientLastName', values.patientLastName);
    prescriptionData.append('patientStreet', values.patientStreet);
    prescriptionData.append('patientCity', values.patientCity);
    prescriptionData.append('patientState', values.patientState);
    prescriptionData.append('patientZipCode', values.patientZipCode);
    prescriptionData.append('patientDOB', values.patientDOB);

    await this.submitPrescription(prescriptionData);
  }

  public async submitPrescription(prescriptionData: FormData) {
    this.http.post(this.SUBMIT_PRESCRIPTION_SERVER_URL, prescriptionData,
      {responseType: "text"}).subscribe(
      res => {
        this.snackbarService.openSnackBarPrescriptionSubmittedSuccess();
      },
      error => {
        this.snackbarService.openSnackBarPrescriptionSubmittedFailed();
      }
    );
  }
}
