import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  secretKey = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f');

  encrypt(value: string): string {
    let text = CryptoJS.AES.encrypt(value, this.secretKey, {mode: CryptoJS.mode.ECB});
    return text.toString();
  }

  decrypt(textToDecrypt: string) {
    var decrypted = CryptoJS.AES.decrypt(textToDecrypt.toString(), this.secretKey, {mode: CryptoJS.mode.ECB});
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
