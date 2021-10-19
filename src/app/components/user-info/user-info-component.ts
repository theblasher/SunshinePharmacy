import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'user-info-component',
  templateUrl: './user-info-component.html'
})
export class UserInfoComponent implements OnInit {
  userInfo = 'User Info';
  medications = 'Medications';

  profiles: Object = [];

  constructor(private policyService: ProfileService) {
  }

  ngOnInit() {
    this.policyService.getProfiles().subscribe(data =>{
      console.log(data);
      this.profiles = data;
    })
  }

}
