import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserInfo} from "../models/user-info";
import {UserInfoService} from "./user-info.service";
import {SnackbarService} from "./snackbar.service";
import {Constants} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  SERVER_URL: string = Constants.SERVER_URL + "login.php/";

  public userInfo !: UserInfo[];
  public loggedIn !: boolean;

  public loginData !: FormData;

  public watchLoginStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router,
              private userInfoService: UserInfoService,
              private snackbarService: SnackbarService) {
  }

  getLoginStatusObservable() {
    return this.watchLoginStatus.asObservable();
  }

  async isAuthenticated() {
    this.loggedIn = await this.http.post<boolean>(this.SERVER_URL, this.loginData).toPromise();
    if (this.loggedIn) {
      this.openSnackBarLoginSuccess();
      await this.router.navigateByUrl('/home');
      this.watchLoginStatus.next(true);
      await this.userInfoService.getUserInfoForLoggedInUser();
    } else {
      this.openSnackBarLoginFailed();
    }
  }

  public openSnackBarLoginSuccess() {
    this.snackbarService.openSnackBarLoginSuccess();
  }

  public openSnackBarLoginFailed() {
    this.snackbarService.openSnackBarLoginFailed();
  }

}
