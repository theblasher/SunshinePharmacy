import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Profile} from "../models/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getProfiles(){
    return this.httpClient.get(this.SERVER_URL + 'profiles');
  }

  public getProfile(profileId: number){
    return this.httpClient.get(`${this.SERVER_URL + 'profiles'}/${profileId}`);
  }
  public createProfile(profile: Profile){
    return this.httpClient.post(`${this.SERVER_URL + 'profiles'}`, profile)
  }

  public deleteProfile(profileId: number){
    return this.httpClient.delete(`${this.SERVER_URL + 'profiles'}/${profileId}`)
  }
  public updateProfile(profile: Profile){
    return this.httpClient.put(`${this.SERVER_URL + 'profiles'}/${profile.id}`, profile)
  }

}
