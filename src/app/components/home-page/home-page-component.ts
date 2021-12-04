import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserInfoService} from "../../services/user-info.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'home-page-component',
  templateUrl: './home-page-component.html',
  styleUrls: ['./home-page-component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  userType!: string;

  private watchAdminStatusSub!: Subscription;
  private watchLoginStatusSub!: Subscription;

  constructor(private authService: AuthenticationService,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    let today = new Date();

    this.watchLoginStatusSub = this.authService.getLoginStatusObservable().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.watchAdminStatusSub = this.userInfoService.getAccountStatusObservable().subscribe(userType => {
      this.userType = userType;
    });
  }

  message = 'Welcome to Sunshine Pharmacy!';
  userMessage = 'Purchasing a prescription?' +
    ' Please login!';
  prescriberMessage = 'Prescribers: To add a prescription' +
    ' for a patient, please' +
    ' login!';
  notLoggedInRegisterMessage = 'If you do not have an account, click "Login" to register!';

  userMessageLoggedIn = 'To view your active prescriptions, Click "View Active Prescriptions"!';
  prescriberMessageLoggedIn = 'To enter a prescription for a patient, Click the "Enter a Prescription Tab"';

  ngOnDestroy() {
    this.watchLoginStatusSub.unsubscribe();
    this.watchAdminStatusSub.unsubscribe();
  }
}
