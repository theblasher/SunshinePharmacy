import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../shared/constants";
import {SnackbarService} from "./snackbar.service";
import {ActivePrescriptions} from "../models/active-prescriptions";
import {UserInfoService} from "./user-info.service";
import {EncryptionService} from "./encryption.service";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  activePrescriptions !: ActivePrescriptions[];
  VIEW_CURRENT_PRESCRIPTION_SERVER_URL: string = Constants.SERVER_URL + "viewcurrentpres.php/";
  SUBMIT_PRESCRIPTION_SERVER_URL: string = Constants.SERVER_URL + "insertprescription.php/";

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private userInfoService: UserInfoService,
              private encryptionService: EncryptionService) {
  }

  public async getActivePrescriptions() {
    let userDataForm = await this.buildFormDataForActivePrescriptions();
    this.activePrescriptions = await this.http.post<ActivePrescriptions[]>(this.VIEW_CURRENT_PRESCRIPTION_SERVER_URL, userDataForm).toPromise();
    await this.decryptActivePrescriptions(this.activePrescriptions);
    return this.activePrescriptions;
  }

  public async decryptActivePrescriptions(activePrescriptions: ActivePrescriptions[]) {
    console.log(activePrescriptions.length)
    for (let i = 0; i < activePrescriptions.length; i++) {
      console.log(this.activePrescriptions[i].Prescriber_First_Name);
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
    prescriptionData.append('prescriberFirstName', values.prescriberFirstName);
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
