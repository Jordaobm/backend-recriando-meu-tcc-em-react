import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';



interface IRequest {
  name: string;
  email: string;
  password: string;
  authorization:string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ name, email, password, authorization }: IRequest): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email já consta na base', 400);
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      authorization,
    });

    return user;
  }
}

export default CreateUserService;