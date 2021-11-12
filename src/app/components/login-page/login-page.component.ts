import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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
              private fb: FormBuilder) {
  }

  async onSubmit() {
      // console.warn('Your order has been submitted', this.loginForm.value);
      await this.saveLoginData(this.loginForm.value);
  }

  async saveLoginData(values: any){
    // console.log(values)
    const productData = new FormData();
    productData.append('userName', values.userName);
    productData.append('password', values.password);

    await this.authService.areYouAuthenticated(productData);
  }
}
