import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService{
  SERVER_URL: string = "http://47.197.115.239/insert.php/";


  constructor(private http: HttpClient,
              private snackbar: MatSnackBar,
              private router: Router,
              private authService: AuthenticationService) {
  }

  public async registerProfile(registerForm: FormData) {
    await this.http.post(this.SERVER_URL, registerForm).subscribe(
      res => {
        this.openSnackBarSuccess();
      },
      error => {
        this.openSnackBarFailed();
      }
    );
    this.authService.isLoggedIn = true;
    await this.router.navigateByUrl("/home");
  }

  public openSnackBarSuccess(){
    this.snackbar.open("Registration Complete!", "OK");
  }

  public openSnackBarFailed(){
    this.snackbar.open("ERROR: Registration Failed!", "OK");
  }
}
