import {Injectable} from "@angular/core";
import {SnackbarService} from "./snackbar.service";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {OrderConfirmDialogComponent} from "../components/order-confirm-dialog/order-confirm-dialog.component";
import {Constants} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  SERVER_URL: string = Constants.SERVER_URL + "insertorder.php/";

  cardNum !: string;

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private matDialog: MatDialog) {
  }

  public saveLastFourOfCreditCard(cardNum: string) {
    this.cardNum = cardNum;
  }

  public async checkoutSubmission(checkoutForm: FormData) {
    await this.http.post(this.SERVER_URL, checkoutForm,
      {responseType: "text"}).subscribe(
      res => {
        this.matDialog.open(OrderConfirmDialogComponent);
        this.snackbarService.openSnackBarCheckoutSuccess();
      },
      error => {
        this.openSnackBarFailed();
      }
    );
  }

  public openSnackBarFailed() {
    this.snackbarService.openSnackBarCheckoutFailed();
  }

}
