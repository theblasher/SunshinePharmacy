import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'order-history-component',
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles = [
    "First Name",
    "Last Name",
    "Medication",
    "Medication Type",
    "Prescriber Last Name",
    "Office Number",
    "Date Of Order"
  ];

  displayedColumns = [
    "First_Name",
    "Last_Name",
    "Medication",
    "Medication_Type",
    "Prescriber_Last_Name",
    "Office_Number",
    "Date_Of_Order"
  ];

  constructor(private orderService: OrderService) {
  }

  async ngOnInit() {
    await this.orderService.getOrderHistory();
    this.tableData.data = this.orderService.orders;
  }
}
