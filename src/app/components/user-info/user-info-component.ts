import { Component } from '@angular/core';

@Component({
  selector: 'user-info-component',
  templateUrl: './user-info-component.html'
})
export class UserInfoComponent {
  userInfo = 'User Info';
  medications = 'Medications';
}
