import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../models/user-info";
import {Constants} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  SERVER_URL_USER_INFO: string = Constants.SERVER_URL + "getuserinfo.php/";
  public loginData !: FormData;
  public userInfo !: UserInfo[];


  constructor(private http: HttpClient) {
  }

  public async getUserInfo() {
    this.userInfo = await this.http.post<UserInfo[]>(this.SERVER_URL_USER_INFO, this.loginData).toPromise();
    return this.userInfo;
  }

}
