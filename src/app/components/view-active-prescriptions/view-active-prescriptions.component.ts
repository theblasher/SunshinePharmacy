import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'view-active-prescriptions-component',
  templateUrl: './view-active-prescriptions.component.html'
})
export class ViewActivePrescriptionsComponent implements OnInit {
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles !: string [];

  displayedColumns !: string [];

  constructor() {
  }

  async ngOnInit() {
    // console.log(this.userInfoService.userInfo[0].User_Type);
    // if (this.userInfoService.userInfo[0].User_Type == "admin") {
    //   this.displayedColumnsTitles = [
    //     "Change Account Type?",
    //     "Username",
    //     "First Name",
    //     "Last Name",
    //     "User Type"
    //   ];
    //
    //   this.displayedColumns = [
    //     "Select",
    //     "Username",
    //     "First_Name",
    //     "Last_Name",
    //     "User_Type"
    //   ];
    //
    //   this.tableData.data = await this.userInfoService.getAdminUserInfo();
    // } else if (this.userInfoService.userInfo[0].User_Type == "user" ||
    //   this.userInfoService.userInfo[0].User_Type == "prescriber") {
    //   this.displayedColumnsTitles = [
    //     "Username",
    //     "First Name",
    //     "Last Name",
    //     "Email",
    //     "Date Of Birth"
    //   ];
    //
    //   this.displayedColumns = [
    //     "Username",
    //     "First_Name",
    //     "Last_Name",
    //     "Email",
    //     "DOB"
    //   ];
    //
    //   this.tableData.data = this.userInfoService.userInfo;
    // }
  }
}
