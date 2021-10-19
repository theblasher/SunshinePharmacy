import { Component } from '@angular/core';

@Component({
  selector: 'medications-component',
  templateUrl: './medications.component.html',
  styleUrls: ['medications.component.css']
})
export class MedicationsComponent {
  userInfo = 'User Info';
  medications = 'Medications';
}
