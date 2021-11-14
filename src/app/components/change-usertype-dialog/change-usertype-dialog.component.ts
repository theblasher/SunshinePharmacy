import {MatDialogRef} from "@angular/material/dialog";
import {Component, OnInit} from "@angular/core";
import {UserInfoService} from "../../services/user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'change-usertype-dialog-component',
  templateUrl: './change-usertype-dialog.component.html'
  // styleUrls: ['./checkout-dialog.component.css']
})

export class ChangeUsertypeDialogComponent implements OnInit {
  dialogTitle = "Change Account Type for "
  userNameToChange !: string;
  userAccountTypeBeforeChange !: string;
  userAccountTypeToChangeTo !: string;

  constructor(private dialogRef: MatDialogRef<ChangeUsertypeDialogComponent>,
              private userInfoService: UserInfoService,
              private router: Router) {
  }

  async ngOnInit() {
    this.userAccountTypeBeforeChange = this.userInfoService.userAccountToChange.User_Type;
    console.log(this.userAccountTypeBeforeChange)
    this.userNameToChange = this.userInfoService.userAccountToChange.Username;
    if (this.userAccountTypeBeforeChange == "admin") {
      this.userAccountTypeToChangeTo = "user"
    } else if (this.userAccountTypeBeforeChange == "user") {
      this.userAccountTypeToChangeTo = "admin"
    }
  }

  async onSubmit() {
    const changeAccountTypeData = new FormData();
    changeAccountTypeData.append('userName', this.userNameToChange);
    changeAccountTypeData.append('userType', this.userAccountTypeToChangeTo);
    await this.userInfoService.adminUpdateAccountType(changeAccountTypeData);
    this.dialogRef.close();
    await this.router.navigateByUrl('/home');
  }

  onCancel() {
    console.log("It will be cancelled");
    this.dialogRef.close();
  }

}
