import { environment } from '@environments/environments';
import CryptoJs from 'crypto-js';

/**
 *
 * @param value
 * @returns Hash to password
 */
export const encrypt = (value: string):string => {
  return CryptoJs.AES.encrypt(value,environment.ENCRYPT.key).toString();
}
/**
 *
 * @param velueEncrypt
 * @returns boolean
 */
export const decrypt = <T>(velueEncrypt: string, password: string): boolean | T => {
  try {
    const bytes = CryptoJs.AES.decrypt(velueEncrypt, environment.ENCRYPT.key);
    let originalText = bytes.toString(CryptoJs.enc.Utf8);
    if( password !== originalText ) return false;
    return (originalText.length > 0);
  } catch (error) {
    console.error('Error decrypting value:', error);
    return false;
  }
}
