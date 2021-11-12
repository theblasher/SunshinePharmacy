import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  SERVER_URL: string = "http://47.197.115.239/insert.php/";


  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private router: Router,
              private authService: AuthenticationService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false
    }
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
    this.authService.watchLoginStatus.next(true);
    await this.router.navigateByUrl('/home');
  }

  public openSnackBarSuccess() {
    this.snackbarService.openSnackBarRegistrationSuccess();
  }

  public openSnackBarFailed() {
    this.snackbarService.openSnackBarRegistrationFailed();
  }
}
