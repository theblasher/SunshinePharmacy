import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserInfo} from "../models/user-info";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  SERVER_URL: string = "http://47.197.115.239/login.php/";

  public userInfo !: UserInfo;

  public watchLoginStatus = new Subject<boolean>();

  constructor(private http: HttpClient,
              private snackbar: MatSnackBar,
              private router: Router) {
  }

  getLoginStatus(){
    return this.watchLoginStatus.asObservable();
  }

  async areYouAuthenticated(loginForm: FormData) {
    await this.http.post<UserInfo>(this.SERVER_URL, loginForm).toPromise().then(next => {
        if (next == null) {
          this.openSnackBarLoginFailed();
        } else {
          this.userInfo = next;
          this.openSnackBarLoginSuccess();
          this.router.navigateByUrl('/home');
          this.watchLoginStatus.next(true);
        }
      },
      error => {
        this.handleError(error);
      });
  }

  public async setUserInfo(userInfo: UserInfo){
    this.userInfo = userInfo;
  }

  public getUserInfo() {
    return this.userInfo;
  }

  private handleError(error: HttpErrorResponse) {
      this.openSnackBarWrongPasswordFailed();
  }

  public openSnackBarLoginSuccess(){
    this.snackbar.open("You Logged In!", "OK");
  }

  public openSnackBarLoginFailed(){
    this.snackbar.open("Username is Incorrect", "OK");
  }

  public openSnackBarWrongPasswordFailed(){
    this.snackbar.open("Username exists. Password is Incorrect.", "OK");
  }

}
