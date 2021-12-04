import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../shared/constants";
import {SnackbarService} from "./snackbar.service";
import {ActivePrescriptions} from "../models/active-prescriptions";
import {UserInfoService} from "./user-info.service";
import {EncryptionService} from "./encryption.service";
import {MatDialog} from "@angular/material/dialog";
import {CheckoutDialogComponent} from "../components/checkout-dialog/checkout-dialog.component";
import {PrescriptionHistory} from "../models/prescription-history";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  activePrescriptions !: ActivePrescriptions[];
  openedPrescription !: ActivePrescriptions;
  VIEW_CURRENT_PRESCRIPTION_SERVER_URL: string = Constants.SERVER_URL + "viewcurrentpres.php/";
  SUBMIT_PRESCRIPTION_SERVER_URL: string = Constants.SERVER_URL + "insertprescription.php/";
  VIEW_SENT_PRESCRIPTIONS_SERVER_URL: string = Constants.SERVER_URL + "viewinsertedprescription.php/";
  DELETE_ACTIVE_PRESCRIPTION: string = Constants.SERVER_URL + "deleteactiveprescription.php/";

  public prescriptions !: PrescriptionHistory[];

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private userInfoService: UserInfoService,
              private encryptionService: EncryptionService,
              private matDialog: MatDialog) {
  }

  public openPrescriptionDialog(element: ActivePrescriptions) {
    this.openedPrescription = element;
    this.matDialog.open(CheckoutDialogComponent);
  }

  public async getActivePrescriptions() {
    let userDataForm = await this.buildFormDataForActivePrescriptions();
    this.activePrescriptions = await this.http.post<ActivePrescriptions[]>(this.VIEW_CURRENT_PRESCRIPTION_SERVER_URL, userDataForm).toPromise();
    if (this.activePrescriptions == null) {
      return "null";
    }
    await this.decryptActivePrescriptions(this.activePrescriptions);
    return this.activePrescriptions;
  }

  public async deleteActivePrescriptions(activePrescriptionID: string) {
    const activePrescriptionIDData = new FormData();
    activePrescriptionIDData.append("prescriptionID", activePrescriptionID)
    await this.http.post<string>(this.DELETE_ACTIVE_PRESCRIPTION, activePrescriptionIDData).toPromise();
  }

  public async decryptActivePrescriptions(activePrescriptions: ActivePrescriptions[]) {
    for (let i = 0; i < activePrescriptions.length; i++) {
      this.activePrescriptions[i].Prescriber_First_Name = this.encryptionService.decrypt(this.activePrescriptions[i].Prescriber_First_Name);
      this.activePrescriptions[i].Prescriber_Last_Name = this.encryptionService.decrypt(this.activePrescriptions[i].Prescriber_Last_Name);
      this.activePrescriptions[i].Medication = this.encryptionService.decrypt(this.activePrescriptions[i].Medication);
      this.activePrescriptions[i].Medication_Frequency = this.encryptionService.decrypt(this.activePrescriptions[i].Medication_Frequency);
      this.activePrescriptions[i].Medication_Quantity = this.encryptionService.decrypt(this.activePrescriptions[i].Medication_Quantity);
      this.activePrescriptions[i].Medication_Type = this.encryptionService.decrypt(this.activePrescriptions[i].Medication_Type);
    }
  }

  async buildFormDataForActivePrescriptions() {
    const userInfoData = new FormData();

    userInfoData.append('patientFirstName', this.encryptionService.encrypt(this.userInfoService.userInfo[0].First_Name));
    userInfoData.append('patientLastName', this.encryptionService.encrypt(this.userInfoService.userInfo[0].Last_Name));
    userInfoData.append('patientDOB', this.encryptionService.encrypt(this.userInfoService.userInfo[0].DOB));
    return userInfoData;
  }

  async savePrescriptionInfo(values: any) {
    const prescriptionData = new FormData();
    prescriptionData.append('medication', values.medication);
    prescriptionData.append('medicationQuantity', values.medicationQuantity);
    prescriptionData.append('medicationFrequency', values.medicationFrequency);
    prescriptionData.append('type', values.type);
    prescriptionData.append('prescriberID', values.prescriberID);
    prescriptionData.append('prescriberFirstName', values.prescriberFirstName);
    prescriptionData.append('prescriberLastName', values.prescriberLastName);
    prescriptionData.append('patientFirstName', values.patientFirstName);
    prescriptionData.append('patientLastName', values.patientLastName);
    prescriptionData.append('patientStreet', values.patientStreet);
    prescriptionData.append('patientCity', values.patientCity);
    prescriptionData.append('patientState', values.patientState);
    prescriptionData.append('patientZipCode', values.patientZipCode);
    prescriptionData.append('patientDOB', values.patientDOB);
    prescriptionData.append('datePrescribed', values.datePrescribed);

    await this.submitPrescription(prescriptionData);
  }

  public async getPrescriptionHistory(prescriberID: string) {
    const prescriberIDData = new FormData();
    prescriberIDData.append('prescriberID', prescriberID);
    this.prescriptions = await this.http.post<PrescriptionHistory[]>(this.VIEW_SENT_PRESCRIPTIONS_SERVER_URL, prescriberIDData).toPromise();
    if (this.prescriptions == null) {
      return "null"
    }
    await this.decryptPrescriptionHistory(this.prescriptions);
    return this.prescriptions;
  }

  public async decryptPrescriptionHistory(prescriptionHistory: PrescriptionHistory[]) {
    for (let i = 0; i < prescriptionHistory.length; i++) {
      this.prescriptions[i].Patient_First_Name = this.encryptionService.decrypt(this.prescriptions[i].Patient_First_Name);
      this.prescriptions[i].Patient_Last_Name = this.encryptionService.decrypt(this.prescriptions[i].Patient_Last_Name);
      this.prescriptions[i].Medication = this.encryptionService.decrypt(this.prescriptions[i].Medication);
      this.prescriptions[i].Medication_Type = this.encryptionService.decrypt(this.prescriptions[i].Medication_Type);
      this.prescriptions[i].Date_Prescribed = this.encryptionService.decrypt(this.prescriptions[i].Date_Prescribed);
    }
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
