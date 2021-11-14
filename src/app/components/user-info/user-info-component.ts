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

  displayedColumnsTitles !: string [];

  displayedColumns !: string [];

  constructor(private authService: AuthenticationService,
              private userInfoService: UserInfoService) {
  }

  async ngOnInit() {
    console.log(this.userInfoService.userInfo[0].User_Type);
    if (this.userInfoService.userInfo[0].User_Type == "admin") {
      this.displayedColumnsTitles = [
        "Username",
        "First Name",
        "Last Name"
      ];

      this.displayedColumns = [
        "Username",
        "First_Name",
        "Last_Name"
      ];

      this.tableData.data = await this.userInfoService.getAdminUserInfo();
    } else if (this.userInfoService.userInfo[0].User_Type == "user") {
      this.displayedColumnsTitles = [
        "Username",
        "First Name",
        "Last Name",
        "Email",
        "Date Of Birth"
      ];

      this.displayedColumns = [
        "Username",
        "First_Name",
        "Last_Name",
        "Email",
        "DOB"
      ];

      this.tableData.data = this.userInfoService.userInfo;
    }
  }

}
