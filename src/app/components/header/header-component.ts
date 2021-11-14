import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'header-component',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticationService,
              private snackbarService: SnackbarService) {
  }


  private watchLoginStatusSub!: Subscription;

  loggedIn = false;
  link = [
    {path: '/home', label: 'Home'},
    {path: '/medications', label: 'Medications'},
    {path: '/userinfo', label: 'User Info'}
  ];
  login = {path: '/login', label: 'Login'};
  logout = {path: '/home', label: 'Logout'};

  homePage = "Home"
  userInfo = 'User Info';
  medications = 'Medications';

  ngOnInit() {
    this.watchLoginStatusSub = this.authService.getLoginStatusObservable().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
  }

  logoutFunction() {
    this.authService.watchLoginStatus.next(false);
    this.snackbarService.openSnackBarLogout();
  }

  ngOnDestroy() {
    this.watchLoginStatusSub.unsubscribe();
  }
}
