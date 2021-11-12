import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserInfoService} from "../../services/user-info.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  registerMessage = "Not registered? Register here!";
  register = {path: '/register'};

  loginForm = this.fb.group({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthenticationService,
              private userInfoService: UserInfoService,
              private fb: FormBuilder,
              private router: Router) {
  }

  async onSubmit() {
    await this.saveLoginData(this.loginForm.value);
    this.loginForm.reset();
  }

  async onCancel() {
    await this.router.navigateByUrl('/home');
  }

  async saveLoginData(values: any) {
    const loginData = new FormData();
    loginData.append('userName', values.userName);
    loginData.append('password', values.password);

    this.authService.loginData = loginData;
    this.userInfoService.loginData = loginData;


    await this.authService.isAuthenticated();
  }
}
