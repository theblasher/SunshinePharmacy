import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registration = new FormGroup({});
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  dateOfBirth = new FormControl('', Validators.required);
  userName =  new FormControl('', Validators.required);
  password =  new FormControl('', Validators.required);
  reEnterPassword =  new FormControl('', Validators.required);


  constructor(private fb: FormBuilder,
              private router: Router) {
    this.registration = fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      dateOfBirth: this.dateOfBirth,
      userName: this.userName,
      password: this.password,
      reEnterPassword: this.reEnterPassword
    });
  }

  onSubmit(){
    if (this.password == this.reEnterPassword){
      let registrationInfo = this.registration.value;
    }
    return "This needs to go to backend database";
  }

  onCancel(){
    this.router.navigateByUrl("/login")
  }

  errorMessage(){
    if (this.registration.hasError('email')){
      return "This is not a valid email";
    }
    else {
      return "An email is required"
    }
  }
}
