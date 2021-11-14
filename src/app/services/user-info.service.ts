import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../models/user-info";
import {Constants} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  SERVER_URL_USER_INFO: string = Constants.SERVER_URL + "getuserinfo.php/";
  SERVER_URL_ADMIN_USER_INFO: string = Constants.SERVER_URL + "adminviewusers.php/";

  public loginData !: FormData;
  public userInfo !: UserInfo[];
  public adminUserInfo !: UserInfo[];


  constructor(private http: HttpClient) {
  }

  public async getAdminUserInfo() {
    this.adminUserInfo = await this.http.get<UserInfo[]>(this.SERVER_URL_ADMIN_USER_INFO).toPromise();
    return this.adminUserInfo;
  }

  public async getUserInfo() {
    this.userInfo = await this.http.post<UserInfo[]>(this.SERVER_URL_USER_INFO, this.loginData).toPromise();
    return this.userInfo;
  }

}
