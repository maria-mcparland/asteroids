import IEncryptionService from "~/types/IEncryptionService";
import CryptoJS from "crypto-js";

export default class EncrpytionService implements IEncryptionService {
  encryptData(data: string): string {
    var ciphertext = CryptoJS.AES.encrypt(data, process.env.KEY).toString();
    return ciphertext;
  }
  decryptData(data: string): string {
    var bytes = CryptoJS.AES.decrypt(data, process.env.KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
