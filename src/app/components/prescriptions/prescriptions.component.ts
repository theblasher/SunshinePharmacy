import {Component, OnInit} from '@angular/core';
import {MedicationsService} from "../../services/medications.service";
import {Medications} from "../../models/medications";
import {MatTableDataSource} from "@angular/material/table";
import {UserInfoService} from "../../services/user-info.service";

@Component({
  selector: 'medications-component',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
  medications!: Medications[];
  tableData = new MatTableDataSource<any>([]);

  displayedColumnsTitles = [""];
  displayedColumns = [""];


  constructor(private medicationsService: MedicationsService,
              private userInfoService: UserInfoService) {
  }

  async ngOnInit() {
    let userInfo = this.userInfoService.userInfo[0];
    if (userInfo.User_Type == "admin") {
      this.displayedColumnsTitles = [
        "Select?",
        "Drug Name",
        "Brand Name",
        "Product ID",
        "Product NDC",
        "Product Type Name",
        "Proprietary Name Suffix",
        "Non-Proprietary Name",
        "Dosage Form Name",
        "Route Name",
        "Start Marketing Date",
        "End Marketing Date",
        "Marketing Category Name",
        "Application Number",
        "Labeler Name",
        "Active Numerator Strength",
        "Active Ingredient Unit",
        "Pharmacy Classes",
        "DEA Schedule",
        "NDC Exclude Flag",
        "Listing Record Certified Through"
      ];

      this.displayedColumns = [
        "Select",
        "SubstanceName",
        "ProprietaryName",
        "ProductID",
        "ProductNDC",
        "ProductTypeName",
        "ProprietaryNameSuffix",
        "NonProprietaryName",
        "DosageFormName",
        "RouteName",
        "StartMarketingDate",
        "EndMarketingDate",
        "MarketingCategoryName",
        "ApplicationNumber",
        "LabelerName",
        "Active_Numerator_Strength",
        "Active_Ingred_Unit",
        "Pharm_Classes",
        "DEASchedule",
        "NDC_Exclude_Flag",
        "Listing_Record_Certified_Through"
      ];
    }
    if (userInfo.User_Type == "prescriber") {
      this.displayedColumnsTitles = [
        "Select?",
        "Brand Name",
        "Drug Name",
        "Product ID",
        "Product NDC",
        "Product Type Name",
        "Proprietary Name Suffix",
        "Non-Proprietary Name",
        "Dosage Form Name",
        "Route Name",
        "Start Marketing Date",
        "End Marketing Date",
        "Marketing Category Name",
        "Application Number",
        "Labeler Name",
        "Active Numerator Strength",
        "Active Ingredient Unit",
        "Pharmacy Classes",
        "DEA Schedule",
        "NDC Exclude Flag",
        "Listing Record Certified Through"
      ];

      this.displayedColumns = [
        "Select",
        "ProprietaryName",
        "SubstanceName",
        "ProductID",
        "ProductNDC",
        "ProductTypeName",
        "ProprietaryNameSuffix",
        "NonProprietaryName",
        "DosageFormName",
        "RouteName",
        "StartMarketingDate",
        "EndMarketingDate",
        "MarketingCategoryName",
        "ApplicationNumber",
        "LabelerName",
        "Active_Numerator_Strength",
        "Active_Ingred_Unit",
        "Pharm_Classes",
        "DEASchedule",
        "NDC_Exclude_Flag",
        "Listing_Record_Certified_Through"
      ];
    } else if (userInfo.User_Type == "user") {
      this.displayedColumnsTitles = [
        "Select?",
        "Brand Name",
        "Drug Name"
      ];

      this.displayedColumns = [
        "Select",
        "ProprietaryName",
        "SubstanceName"
      ];
    }
    await this.medicationsService.getMedications();
    this.tableData.data = this.medicationsService.medications;
  }
}
