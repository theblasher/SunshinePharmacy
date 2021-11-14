import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {SnackbarService} from "./snackbar.service";
import {Constants} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  SERVER_URL: string = Constants.SERVER_URL + "insert.php/";
  SERVER_URL_CHECK_USERNAME: string = Constants.SERVER_URL + "checkusername.php/";


  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  public async checkUserName(userName: FormData, registerForm: FormData) {
    console.log(userName);
    let response = await this.http.post(this.SERVER_URL_CHECK_USERNAME, userName).toPromise();
    console.log(response);
    if (response == 1) {
      this.snackbarService.openSnackBarUserNameExists();
    } else if (response == 0) {
      await this.registerProfile(registerForm);
    }
  }

  public async registerProfile(registerForm: FormData) {
    this.http.post(this.SERVER_URL, registerForm).subscribe(
      res => {
        this.snackbarService.openSnackBarRegistrationSuccess();
        this.authService.watchLoginStatus.next(true);
        this.authService.isAuthenticated();
      },
      error => {
        this.snackbarService.openSnackBarRegistrationFailed();
      }
    );
    await this.router.navigateByUrl('/home');
  }
}
