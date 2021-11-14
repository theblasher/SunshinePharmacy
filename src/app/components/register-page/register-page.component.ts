import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  registrationForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    reEnterPassword: new FormControl('', Validators.required)
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private registerService: RegisterService,
              private authService: AuthenticationService,
              private userInfoService: UserInfoService) {
  }

  async saveData(values: any) {
    const userNameData = new FormData();
    userNameData.append('userName', values.userName);

    const loginData = new FormData();
    loginData.append('userName', values.userName);
    loginData.append('password', values.password);

    this.authService.loginData = loginData;
    this.userInfoService.loginData = loginData;

    const registrationData = new FormData();
    registrationData.append('firstName', values.firstName);
    registrationData.append('lastName', values.lastName);
    registrationData.append('email', values.email);
    registrationData.append('dateOfBirth', values.dateOfBirth);
    registrationData.append('userName', values.userName);
    registrationData.append('password', values.password);

    await this.registerService.checkUserName(userNameData, registrationData);
  }

  async onSubmit() {
    if (this.registrationForm.value.password == this.registrationForm.value.reEnterPassword) {
      console.warn('Your order has been submitted', this.registrationForm.value);
      await this.saveData(this.registrationForm.value);
      this.registrationForm.reset();
    }

  }

  async onCancel() {
    await this.router.navigateByUrl("/login");
  }

}
