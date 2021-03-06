import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {


    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email/Senha incorreto", 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatched) {
      throw new AppError("Email/Senha incorreto", 401);
    }

    const { privateKey, expiresIn } = authConfig.jwt;

    const token = sign({id:user.id, authorization: user.authorization}, privateKey, {expiresIn:'1d', algorithm: 'RS256'})

    return { user, token }
  }
}

export default AuthenticateUserService;
