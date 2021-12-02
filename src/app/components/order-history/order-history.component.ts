import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {OrderService} from "../../services/order.service";
import {UserInfoService} from "../../services/user-info.service";
import {EncryptionService} from "../../services/encryption.service";

@Component({
  selector: 'order-history-component',
  templateUrl: './order-history.component.html',
  styleUrls: ['order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles = [
    "First Name",
    "Last Name",
    "Medication",
    "Medication Type",
    "Prescriber Last Name",
    "Date Of Order"
  ];

  displayedColumns = [
    "First_Name",
    "Last_Name",
    "Medication",
    "Medication_Type",
    "Prescriber_Last_Name",
    "Date_Of_Order"
  ];

  isNull = false;

  constructor(private orderService: OrderService,
              private userInfoService: UserInfoService,
              private encryptionService: EncryptionService) {
  }

  async ngOnInit() {
    let getOrders = await this.orderService.getOrderHistory(this.encryptionService.encrypt(this.userInfoService.userInfo[0].ID.toString()));
    if (getOrders == "null") {
      this.isNull = true;
    } else {
      this.tableData.data = this.orderService.orders;
    }

  }
}
