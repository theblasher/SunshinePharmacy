import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  public watchLoginStatus = new Subject<boolean>();

  getLoginStatus(){
    return this.watchLoginStatus.asObservable();
  }

}
