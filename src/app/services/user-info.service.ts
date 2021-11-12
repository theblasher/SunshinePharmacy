import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../models/user-info";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  SERVER_URL_USER_INFO: string = "http://47.197.115.239/getuserinfo.php/";
  public loginData !: FormData;
  public userInfo !: UserInfo[];


  constructor(private http: HttpClient) {
  }

  public async getUserInfo() {
    this.userInfo = await this.http.post<UserInfo[]>(this.SERVER_URL_USER_INFO, this.loginData).toPromise();
    return this.userInfo;
  }

}
