import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../models/user-info";
import {Constants} from "../shared/constants";
import {MatDialog} from "@angular/material/dialog";
import {ChangeUsertypeDialogComponent} from "../components/change-usertype-dialog/change-usertype-dialog.component";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  SERVER_URL_USER_INFO: string = Constants.SERVER_URL + "getuserinfo.php/";
  SERVER_URL_ADMIN_USER_INFO: string = Constants.SERVER_URL + "adminviewusers.php/";
  SERVER_URL_ADMIN_UPDATE_ACCT_TYPE: string = Constants.SERVER_URL + "updateusertype.php/";

  public loginData !: FormData;
  public userInfo !: UserInfo[];
  public adminUserInfo !: UserInfo[];

  public userAccountToChange !: UserInfo;


  constructor(private http: HttpClient,
              private matDialog: MatDialog,
              private snackbarService: SnackbarService) {
  }

  public async getAdminUserInfo() {
    this.adminUserInfo = await this.http.get<UserInfo[]>(this.SERVER_URL_ADMIN_USER_INFO).toPromise();
    return this.adminUserInfo;
  }

  public async getUserInfo() {
    this.userInfo = await this.http.post<UserInfo[]>(this.SERVER_URL_USER_INFO, this.loginData).toPromise();
    return this.userInfo;
  }

  public openAccountChangeDialog(element: UserInfo) {
    console.log(element);
    this.userAccountToChange = element;
    this.matDialog.open(ChangeUsertypeDialogComponent);
  }

  public adminUpdateAccountType(accountUpdateData: FormData) {
    this.http.post(this.SERVER_URL_ADMIN_UPDATE_ACCT_TYPE, accountUpdateData, {responseType: "text"}).subscribe(res => {
        this.snackbarService.openSnackBarAccountUpdateInformationSuccess();
      },
      error => {
        this.snackbarService.openSnackBarAccountUpdateInformationFailed();
      });
  }

}
