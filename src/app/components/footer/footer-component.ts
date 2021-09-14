import { Component } from '@angular/core';
import { RouterModule} from "@angular/router";

@Component({
  selector: 'footer-component',
  templateUrl: './footer-component.html'
})
export class FooterComponent {
  userInfo = 'User Info';
  medications = 'Medications';
}
