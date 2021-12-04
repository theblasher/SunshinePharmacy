import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {OrderService} from "../../services/order.service";
import {UserInfoService} from "../../services/user-info.service";
import {EncryptionService} from "../../services/encryption.service";
import {PrescriptionService} from "../../services/prescription.service";

@Component({
  selector: 'order-history-component',
  templateUrl: './order-history.component.html',
  styleUrls: ['order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  tableData = new MatTableDataSource<any>([]);

  isNull = false;
  userProfileType!: string;

  displayedColumnsTitles = [""];
  displayedColumns = [""];

  constructor(private orderService: OrderService,
              private prescriptionService: PrescriptionService,
              private userInfoService: UserInfoService,
              private encryptionService: EncryptionService) {
  }

  async ngOnInit() {
    this.userProfileType = this.userInfoService.userInfo[0].User_Type;
    if (this.userProfileType == "prescriber") {
      this.displayedColumnsTitles = [
        "Patient First Name",
        "Patient Last Name",
        "Medication",
        "Medication Type",
        "Date Prescribed"
      ];

      this.displayedColumns = [
        "Patient_First_Name",
        "Patient_Last_Name",
        "Medication",
        "Medication_Type",
        "Date_Prescribed"
      ];

      let getPrescriptions = await this.prescriptionService.getPrescriptionHistory(this.encryptionService.encrypt(this.userInfoService.userInfo[0].ID.toString()));
      if (getPrescriptions == "null") {
        this.isNull = true;
      } else {
        this.tableData.data = this.prescriptionService.prescriptions;
      }

    } else if (this.userProfileType == "user") {
      this.displayedColumnsTitles = [
        "First Name",
        "Last Name",
        "Medication",
        "Medication Type",
        "Prescriber Last Name",
        "Date Of Order"
      ];

      this.displayedColumns = [
        "First_Name",
        "Last_Name",
        "Medication",
        "Medication_Type",
        "Prescriber_Last_Name",
        "Date_Of_Order"
      ];
      let getOrders = await this.orderService.getOrderHistory(this.encryptionService.encrypt(this.userInfoService.userInfo[0].ID.toString()));
      if (getOrders == "null") {
        this.isNull = true;
      } else {
        this.tableData.data = this.orderService.orders;
      }
    }

  }
}
