import { Component } from '@angular/core';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerMessage = "Not registered? Register here!";
  register = {path: '/register'};
}
