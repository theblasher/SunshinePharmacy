import {Component, OnInit} from '@angular/core';
import {MedicationsService} from "../../services/medications.service";
import {Medications} from "../../models/medications";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'medications-component',
  templateUrl: './medications.component.html',
  styleUrls: ['medications.component.css']
})
export class MedicationsComponent implements OnInit {
  medications!: Medications[];
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles = [
    "Select?",
    "Product ID",
    "Product NDC",
    "Product Type Name",
    "Proprietary Name",
    "Proprietary Name Suffix",
    "Non-Proprietary Name",
    "Dosage Form Name",
    "Route Name",
    "Start Marketing Date",
    "End Marketing Date",
    "Marketing Category Name",
    "Application Number",
    "Labeler Name",
    "Substance Name",
    "Active Numerator Strength",
    "Active Ingredient Unit",
    "Pharmacy Classes",
    "DEA Schedule",
    "NDC Exclude Flag",
    "Listing Record Certified Through"
  ];

  displayedColumns = [
    "Select",
    "ProductID",
    "ProductNDC",
    "ProductTypeName",
    "ProprietaryName",
    "ProprietaryNameSuffix",
    "NonProprietaryName",
    "DosageFormName",
    "RouteName",
    "StartMarketingDate",
    "EndMarketingDate",
    "MarketingCategoryName",
    "ApplicationNumber",
    "LabelerName",
    "SubstanceName",
    "Active_Numerator_Strength",
    "Active_Ingred_Unit",
    "Pharm_Classes",
    "DEASchedule",
    "NDC_Exclude_Flag",
    "Listing_Record_Certified_Through"
  ];


  constructor(private medicationsService: MedicationsService) {
  }

  async ngOnInit() {
    await this.medicationsService.getMedications();
    this.tableData.data = this.medicationsService.medications;
  }
}
