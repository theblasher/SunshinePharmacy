import {Injectable} from "@angular/core";
import {SnackbarService} from "./snackbar.service";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {OrderConfirmDialogComponent} from "../components/order-confirm-dialog/order-confirm-dialog.component";
import {Constants} from "../shared/constants";
import {OrderHistory} from "../models/order-history";
import {OrderInformation} from "../models/order-information";
import {EnterPaymentComponent} from "../components/enter-payment/enter-payment.component";
import {UserInfoService} from "./user-info.service";
import {EncryptionService} from "./encryption.service";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderInformation = {
    ordererID: 0,
    firstName: "",
    lastName: "",
    medication: "",
    medicationType: "",
    prescriberLastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    date: ""
  };

  SERVER_URL: string = Constants.SERVER_URL + "insertorder.php/";
  SERVER_URL_ORDER_HISTORY: string = Constants.SERVER_URL + "vieworders.php/";
  SERVER_URL_VALIDATE_INFO: string = Constants.SERVER_URL + "validateprescriptionorder.php/";

  public orders !: OrderHistory[];

  cardNum !: string;

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private matDialog: MatDialog,
              private userInfoService: UserInfoService,
              private datePipe: DatePipe,
              private encryptionService: EncryptionService) {
  }

  public async decryptOrderHistory(orderHistory: OrderHistory[]) {
    for (let i = 0; i < orderHistory.length; i++) {
      this.orders[i].First_Name = this.encryptionService.decrypt(this.orders[i].First_Name);
      this.orders[i].Last_Name = this.encryptionService.decrypt(this.orders[i].Last_Name);
      this.orders[i].Medication = this.encryptionService.decrypt(this.orders[i].Medication);
      this.orders[i].Medication_Type = this.encryptionService.decrypt(this.orders[i].Medication_Type);
      this.orders[i].Prescriber_Last_Name = this.encryptionService.decrypt(this.orders[i].Prescriber_Last_Name);
      this.orders[i].Date_Of_Order = this.encryptionService.decrypt(this.orders[i].Date_Of_Order);
    }
  }

  public buildOrderForm(values: OrderInformation) {
    const orderInformation = new FormData();
    this.orderInformation.date = <string>this.datePipe.transform(Date(), 'yyyy-MM-dd');
    orderInformation.append('ordererID', this.encryptionService.encrypt(values.ordererID.toString()));
    orderInformation.append('firstName', this.encryptionService.encrypt(values.firstName));
    orderInformation.append('lastName', this.encryptionService.encrypt(values.lastName));
    orderInformation.append('medication', this.encryptionService.encrypt(values.medication));
    orderInformation.append('medicationType', this.encryptionService.encrypt(values.medicationType));
    orderInformation.append('prescriberLastName', this.encryptionService.encrypt(values.prescriberLastName));
    orderInformation.append('streetAddress', this.encryptionService.encrypt(values.streetAddress));
    orderInformation.append('city', this.encryptionService.encrypt(values.city));
    orderInformation.append('state', this.encryptionService.encrypt(values.state));
    orderInformation.append('zipCode', this.encryptionService.encrypt(values.zipCode));
    orderInformation.append('date', this.encryptionService.encrypt(values.date));
    return orderInformation;
  }

  public openOrderConfirmation() {
    this.matDialog.open(EnterPaymentComponent);
  }

  public openCheckoutConfirmation() {
    this.matDialog.open(OrderConfirmDialogComponent);
  }

  public async validateOrder(validateForm: FormData) {
    return await this.http.post<boolean>(this.SERVER_URL_VALIDATE_INFO, validateForm).toPromise();
  }


  public async saveLastFourOfCreditCard(cardNum: string) {
    this.cardNum = cardNum;
  }

  public async getOrderHistory(ordererID: string) {
    const ordererIDData = new FormData();
    ordererIDData.append('ordererID', ordererID);
    this.orders = await this.http.post<OrderHistory[]>(this.SERVER_URL_ORDER_HISTORY, ordererIDData).toPromise();
    await this.decryptOrderHistory(this.orders);
    return this.orders;
  }

  public async checkoutSubmission(orderInfo: OrderInformation) {
    this.http.post(this.SERVER_URL, this.buildOrderForm(orderInfo),
      {responseType: "text"}).subscribe(
      res => {
        this.matDialog.open(OrderConfirmDialogComponent);
        this.snackbarService.openSnackBarCheckoutSuccess();
      },
      error => {
        this.snackbarService.openSnackBarCheckoutFailed();
      }
    );
  }

}
