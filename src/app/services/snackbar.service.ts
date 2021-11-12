import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {
  }

  public openSnackBarLoginSuccess() {
    this.snackbar.open("You Logged In!", "OK");
  }

  public openSnackBarLoginFailed() {
    this.snackbar.open("Username or Password Invalid", "OK");
  }

  public openSnackBarLogout() {
    this.snackbar.open("You have logged out", "OK");
  }

  public openSnackBarRegistrationSuccess() {
    this.snackbar.open("Registration Complete!", "OK");
  }

  public openSnackBarRegistrationFailed() {
    this.snackbar.open("ERROR: Registration Failed!", "OK");
  }

  public openSnackBarCheckoutSuccess() {
    this.snackbar.open("Registration Complete!", "OK");
  }

  public openSnackBarCheckoutFailed() {
    this.snackbar.open("ERROR: Order Submission Failed!", "OK");
  }

}
