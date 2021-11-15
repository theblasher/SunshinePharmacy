import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {
  constructor(public authService: AuthenticationService,
              public router: Router) {

  }

  canActivate(): boolean {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
