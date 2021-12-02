import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {PrescriptionService} from "../../services/prescription.service";

@Component({
  selector: 'view-active-prescriptions-component',
  templateUrl: './view-active-prescriptions.component.html',
  styleUrls: ['./view-active-prescriptions-component.css']
})
export class ViewActivePrescriptionsComponent implements OnInit {
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles !: string [];

  displayedColumns !: string [];

  isNull = false;

  constructor(private prescriptionService: PrescriptionService) {
  }

  async ngOnInit() {
    let getPrescriptions = await this.prescriptionService.getActivePrescriptions();
    if (getPrescriptions == "null") {
      this.isNull = true;
    } else {
      this.tableData.data = this.prescriptionService.activePrescriptions;

      this.displayedColumnsTitles = [
        "Purchase?",
        "Medication",
        "New or Refill?",
        "Medication Quantity",
        "Medication Frequency",
        "Prescriber First Name",
        "Prescriber Last Name"
      ];

      this.displayedColumns = [
        "Select",
        "Medication",
        "Medication_Type",
        "Medication_Quantity",
        "Medication_Frequency",
        "Prescriber_First_Name",
        "Prescriber_Last_Name"
      ];
    }
  }
}
