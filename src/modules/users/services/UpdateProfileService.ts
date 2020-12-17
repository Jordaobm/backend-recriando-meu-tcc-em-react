import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";
import passwordRouter from "../infra/http/routes/password.routes";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string
  name: string;
  email: string;
  old_password?: string;
  password?: string;

}


export default class UpdateProfileService {
  constructor(

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {

  }

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id != user_id) {
      throw new AppError('Email already in use ')
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Não foi informado a senha antiga para atualização do perfil')
    }




    if (password && old_password) {

      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old password this not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }



    return this.usersRepository.save(user);

  }

}
