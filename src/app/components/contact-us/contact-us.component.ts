import {Component} from "@angular/core";

@Component({
  selector: 'contact-us-component',
  templateUrl: './contact-us.component.html',
  styleUrls: ['contact-us.component.css']
})
export class ContactUsComponent {

  pageMessage = 'Have Any Questions? Want to Cancel An Order? Contact Us!';
  pageTitle = 'Contact Us';

  email = "sunshinepharmacy@gmail.com"

}
