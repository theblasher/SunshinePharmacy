import {InMemoryDbService} from 'angular-in-memory-web-api'
import {Injectable} from "@angular/core";
import {Profile} from "../models/profile";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb(){

    let  profiles: Profile[] =  [
      {id: 1, firstName: "Brian", lastName: "Lasher", email: "brian.lasher17@gmail.com", dateOfBirth: "01/09/2000", username: "theblasher", password: "beans"}
    ];

    return {profiles};

  }
}
