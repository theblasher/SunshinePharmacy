import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../../services/user-info.service";
import {AuthenticationService} from "../../services/authentication.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'user-info-component',
  templateUrl: './user-info-component.html'
})
export class UserInfoComponent implements OnInit {
  userInfo = 'User Info';
  medications = 'Medications';

  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles = [
    "Username",
    "First Name",
    "Last Name",
    "Email",
    "Date Of Birth"
  ];

  displayedColumns = [
    "Username",
    "First_Name",
    "Last_Name",
    "Email",
    "DOB"
  ];

  constructor(private authService: AuthenticationService,
              private userInfoService: UserInfoService) {
  }

  async ngOnInit() {
    await this.userInfoService.getUserInfo();
    this.tableData.data = await this.userInfoService.getUserInfo();
  }

}
