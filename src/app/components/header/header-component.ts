import {Component} from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent implements OnInit {

  constructor(){

  }
  link = [
    {path: '/home', label: 'Home'},
    {path: '/medications', label: 'Medications'},
    {path: '/userinfo', label: 'User Info'}
  ];
  login = {path: '/login', label: 'Login'};
  logout = {path: '/home', label: 'Logout'};

  homePage = "Home"
  userInfo = 'User Info';
  medications = 'Medications';

  ngOnInit(){
    console.log("brian");
  }
}
