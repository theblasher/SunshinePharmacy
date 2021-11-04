import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfileService} from "../../services/profile.service";

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
              private profileService: ProfileService) {
  }

  onSubmit() {
    if (this.registrationForm.value.password == this.registrationForm.value.reEnterPassword) {
      console.warn('Your order has been submitted', this.registrationForm.value);
    }
  }

  onCancel() {
    this.router.navigateByUrl("/login");
  }

  errorMessage() {
    if (this.registrationForm.hasError('email')) {
      return "This is not a valid email";
    } else {
      return "An email is required"
    }
  }
}
