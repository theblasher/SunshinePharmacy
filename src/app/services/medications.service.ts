import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Medications} from "../models/medications";


@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  SERVER_URL: string = "http://47.197.115.239/view.php/";
  public medications !: Medications[];

  constructor(private http: HttpClient) {
  }

  public async getMedications() {
    this.medications = await this.http.get<Medications[]>(this.SERVER_URL).toPromise();
    return this.medications;
  }
}
