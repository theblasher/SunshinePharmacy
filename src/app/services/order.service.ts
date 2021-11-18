import {Injectable} from "@angular/core";
import {SnackbarService} from "./snackbar.service";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {OrderConfirmDialogComponent} from "../components/order-confirm-dialog/order-confirm-dialog.component";
import {Constants} from "../shared/constants";
import {OrderHistory} from "../models/order-history";
import {OrderInformation} from "../models/order-information";
import {EnterPaymentComponent} from "../components/enter-payment/enter-payment.component";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderInformation !: OrderInformation;

  SERVER_URL: string = Constants.SERVER_URL + "insertorder.php/";
  SERVER_URL_ORDER_HISTORY: string = Constants.SERVER_URL + "vieworders.php/";
  SERVER_URL_VALIDATE_INFO: string = Constants.SERVER_URL + "validateprescriptionorder.php/";

  public orders !: OrderHistory[];

  cardNum !: string;

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private matDialog: MatDialog) {
  }

  public openOrderConfirmation() {
    this.matDialog.open(EnterPaymentComponent);
  }

  public async validateOrder(validateForm: FormData) {
    return await this.http.post<boolean>(this.SERVER_URL_VALIDATE_INFO, validateForm).toPromise();
  }


  public saveLastFourOfCreditCard(cardNum: string) {
    this.cardNum = cardNum;
  }

  public async getOrderHistory() {
    this.orders = await this.http.get<OrderHistory[]>(this.SERVER_URL_ORDER_HISTORY).toPromise();
    console.log(this.orders);
    return this.orders;
  }

  public async checkoutSubmission(checkoutForm: FormData) {
    this.http.post(this.SERVER_URL, checkoutForm,
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
