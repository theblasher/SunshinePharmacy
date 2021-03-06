import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {SnackbarService} from "../../services/snackbar.service";
import {UserInfoService} from "../../services/user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticationService,
              private snackbarService: SnackbarService,
              private userInfoService: UserInfoService,
              private router: Router) {
  }


  private watchLoginStatusSub!: Subscription;
  private watchAdminStatusSub!: Subscription;

  loggedIn = false;
  accountType = "";
  link = [
    {path: '/home', label: 'Home'},
    {path: '/prescriptions', label: 'Enter a Prescription'},
    {path: '/userinfo', label: 'User Info'},
    {path: '/orderhistory', label: 'Order History'},
    {path: '/viewprescriptions', label: "View Active Prescriptions"},
    {path: '/orderhistory', label: 'Who Have You Prescribed To?'},
    {path: '/contactus', label: 'Contact Us'}
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
    this.watchAdminStatusSub = this.userInfoService.getAccountStatusObservable().subscribe(accountType => {
      this.accountType = accountType;
    })
  }

  onClick() {
    this.router.navigateByUrl('/home');
  }

  logoutFunction() {
    this.authService.watchLoginStatus.next(false);
    this.snackbarService.openSnackBarLogout();
  }

  ngOnDestroy() {
    this.watchLoginStatusSub.unsubscribe();
    this.watchAdminStatusSub.unsubscribe();
  }
}
