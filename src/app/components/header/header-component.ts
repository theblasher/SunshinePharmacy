import {Component} from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
  link = [
    {path: '/home', label: 'Home'},
    {path: '/medications', label: 'Medications'},
    {path: '/userinfo', label: 'User Info'}
  ];
  login = {path: '/login', label: 'Login'};

  homePage = "Home"
  userInfo = 'User Info';
  medications = 'Medications';
}
