import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserInfo} from "../models/user-info";
import {UserInfoService} from "./user-info.service";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  SERVER_URL: string = "http://47.197.115.239/login.php/";
  SERVER_URL_USER_INFO: string = "http://47.197.115.239/getuserinfo.php/";

  public userInfo !: UserInfo[];
  public loggedIn !: boolean;

  public loginData !: FormData;

  public watchLoginStatus = new Subject<boolean>();

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
    console.log(this.loggedIn);
    if (this.loggedIn) {
      this.openSnackBarLoginSuccess();
      await this.router.navigateByUrl('/home');
      this.watchLoginStatus.next(true);
      await this.userInfoService.getUserInfo();
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
