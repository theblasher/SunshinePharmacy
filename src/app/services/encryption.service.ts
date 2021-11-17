import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  encrypt(valueToBeEncrypted: string){
    return CryptoJS.AES.encrypt(valueToBeEncrypted.trim(), '3').toString();
  }

  decrypt(valueToBeDencrypted: string){
    return CryptoJS.AES.decrypt(valueToBeDencrypted,"3").toString(CryptoJS.enc.Utf8);
  }

}
