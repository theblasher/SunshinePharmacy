import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {PrescriptionService} from "../../services/prescription.service";

@Component({
  selector: 'view-active-prescriptions-component',
  templateUrl: './view-active-prescriptions.component.html'
})
export class ViewActivePrescriptionsComponent implements OnInit {
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles !: string [];

  displayedColumns !: string [];

  constructor(private prescriptionService: PrescriptionService) {
  }

  async ngOnInit() {
    await this.prescriptionService.getActivePrescriptions();
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
