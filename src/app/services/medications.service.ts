import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medications} from "../models/medications";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  SERVER_URL: string = "http://47.197.115.239/view.php/";
  public medications !: Medications[];

  public medicationConfirm !: Medications;

  constructor(private http: HttpClient,
              private route: Router) {
  }

  public async getMedications() {
    this.medications = await this.http.get<Medications[]>(this.SERVER_URL).toPromise();
    return this.medications;
  }

  public openConfirmationPage(element: Medications){
    this.medicationConfirm = element;
    this.route.navigate(['/medConfirmation']);

  }
}
