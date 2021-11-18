import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {MedicationsService} from "../../services/medications.service";
import {UserInfoService} from "../../services/user-info.service";
import {PrescriptionService} from "../../services/prescription.service";

@Component({
  selector: 'table-component',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
})
export class TableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() displayedColumnTitles: string[] = [];
  @Input() dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort ?: MatSort;

  constructor(private medService: MedicationsService,
              private prescriptionService: PrescriptionService,
              private userInfoService: UserInfoService) {
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      return;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    } else {
      return;
    }
  }

  applyFilter(event: Event) {
    if ((event.target as HTMLInputElement).value == null) {
      return;
    }

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClick(element: any) {
    if (this.userInfoService.userInfo[0].User_Type == "admin") {
      this.userInfoService.openAccountChangeDialog(element);
    } else if (this.userInfoService.userInfo[0].User_Type == "user") {
      this.prescriptionService.openPrescriptionDialog(element);
    } else if (this.userInfoService.userInfo[0].User_Type == "prescriber") {
      this.medService.openPrescriberOrderDialog(element);
    }
  }

}
