import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Profile} from "../../models/profile";
import {ProfileService} from "../../services/profile.service";

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
              private router: Router,
              private profileService: ProfileService) {
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
    console.log(this.registration.value.password)
    if (this.registration.value.password == this.registration.value.reEnterPassword){
      let registrationInfo : Profile = {
        id: 2,
        firstName: this.registration.value.firstName,
        lastName: this.registration.value.lastName,
        email: this.registration.value.email,
        dateOfBirth: this.registration.value.dateOfBirth,
        username: this.registration.value.userName,
        password: this.registration.value.password
      }
      console.log(registrationInfo);

      this.profileService.createProfile(registrationInfo);
      this.router.navigateByUrl("/login")
    }
  }

  onCancel(){
    this.router.navigateByUrl("/login");
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
