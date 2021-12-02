import {Component} from '@angular/core';

@Component({
  selector: 'home-page-component',
  templateUrl: './home-page-component.html',
  styleUrls: ['./home-page-component.css']
})
export class HomePageComponent {
  message = 'Welcome to Sunshine Pharmacy!';
  userMessage = ' If you are here to purchase a prescription' +
    ' that a prescriber has assigned to you, please' +
    ' login!';
  prescriberMessage = 'Prescribers: If you are here to input a prescription' +
    ' for a patient, please' +
    ' login!';
}
