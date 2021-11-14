import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {
  }

  public openSnackBarLoginSuccess() {
    this.snackbar.open("You Logged In!", "OK", {duration: 5000});
  }

  public openSnackBarLoginFailed() {
    this.snackbar.open("Username or Password Invalid", "OK", {duration: 5000});
  }

  public openSnackBarLogout() {
    this.snackbar.open("You have logged out", "OK", {duration: 5000});
  }

  public openSnackBarRegistrationSuccess() {
    this.snackbar.open("Registration Complete!", "OK", {duration: 5000});
  }

  public openSnackBarUserNameExists() {
    this.snackbar.open("ERROR: Username already exists!", "OK", {duration: 5000});
  }


  public openSnackBarRegistrationFailed() {
    this.snackbar.open("ERROR: Registration Failed!", "OK", {duration: 5000});
  }

  public openSnackBarCheckoutSuccess() {
    this.snackbar.open("Order Submitted!", "OK", {duration: 5000});
  }

  public openSnackBarCheckoutFailed() {
    this.snackbar.open("ERROR: Order Submission Failed!", "OK", {duration: 5000});
  }

}
