import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {
  }

  public openSnackBarPasswordsDoNotMatch() {
    this.snackbar.open("Passwords Do Not Match!", "OK", {duration: 5000});
  }

  public openSnackBarLoginSuccess() {
    this.snackbar.open("Login Successful!", "OK", {duration: 5000});
  }

  public openSnackBarLoginFailed() {
    this.snackbar.open("Username or Password Invalid!", "OK", {duration: 5000});
  }

  public openSnackBarLogout() {
    this.snackbar.open("You have logged out! Thank you for visiting!", "OK", {duration: 5000});
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

  public openSnackBarAccountUpdateInformationSuccess() {
    this.snackbar.open("Account Information Updated!", "OK", {duration: 5000});
  }

  public openSnackBarAccountUpdateInformationFailed() {
    this.snackbar.open("ERROR: Update of Account Information Failed!", "OK", {duration: 5000});
  }

  public openSnackBarPrescriptionSubmittedSuccess() {
    this.snackbar.open("The prescription was successfully submitted!", "OK", {duration: 5000});
  }

  public openSnackBarPrescriptionSubmittedFailed() {
    this.snackbar.open("ERROR: Something happened. The prescription was not successfully submitted!", "OK", {duration: 5000});
  }

  public openSnackBarOrderConfirmationFailed() {
    this.snackbar.open("ERROR: The info you entered is not correct. Try again or contact the pharmacist.", "OK", {duration: 5000});
  }


}
