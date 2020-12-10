import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('Authenticate User Service Test', () => {


  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  })


  it('should be able to authenticate a user ', async () => {

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token')
  })


  it('should not be able to authenticate a user that does not exist', async () => {



    expect(authenticateUser.execute({
      email: 'johntre@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })



  it('should not be able to authenticate with wrong password', async () => {

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    })

    expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'senha errada',
    })).rejects.toBeInstanceOf(AppError)
  })

})
