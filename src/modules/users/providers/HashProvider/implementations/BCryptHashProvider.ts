import IHashProvider from "../models/IHashProvider";
import { hash, compare } from 'bcryptjs';



export default class BCrypyHashProvider implements IHashProvider {

  public async generateHash(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }
}
