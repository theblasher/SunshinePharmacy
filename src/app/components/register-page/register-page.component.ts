import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";

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
              private registerService: RegisterService) {
  }

  async saveData(values: any) {
    const registrationData = new FormData();
    registrationData.append('firstName', values.firstName);
    registrationData.append('lastName', values.lastName);
    registrationData.append('email', values.email);
    registrationData.append('dateOfBirth', values.dateOfBirth);
    registrationData.append('userName', values.userName);
    registrationData.append('password', values.password);

    await this.registerService.registerProfile(registrationData);
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

  errorMessage() {
    if (this.registrationForm.hasError('email')) {
      return "This is not a valid email";
    } else {
      return "An email is required"
    }
  }
}
