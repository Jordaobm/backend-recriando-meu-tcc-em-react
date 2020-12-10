import IHashProvider from "../models/IHashProvider";


export default class FakeHashProvider implements IHashProvider {

  public async generateHash(password: string): Promise<string> {
    return password
  }

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return password == hashed;
  }
}
