import {Component} from '@angular/core';

@Component({
  selector: 'home-page-component',
  templateUrl: './home-page-component.html',
  styleUrls: ['./home-page-component.css']
})
export class HomePageComponent {
  message = 'Welcome to Sunshine Pharmacy! To see your user information or order a prescription, please login!';
}
