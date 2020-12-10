import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;



describe('CreateUser', () => {


  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)

  })


  it('should be able to create a new user', async () => {

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    })

    expect(user).toHaveProperty('id');
  })



  it('should not be able to create a new user with same email from another', async () => {

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'

    })

    await expect(createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    }),
    ).rejects.toBeInstanceOf(AppError);
  })

});
