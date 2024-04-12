export default interface IEncryptionService {
  encryptData(data: string): string;
  decryptData(data: string): string;
}
