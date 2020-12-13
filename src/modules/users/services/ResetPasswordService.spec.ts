import ResetPasswordService from "./ResetPasswordService"
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";


let fakeUserTokensRepostory: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('Reset Password Service Test', () => {
  fakeUserTokensRepostory = new FakeUserTokensRepository();
  fakeUsersRepository = new FakeUsersRepository();
  fakeHashProvider = new FakeHashProvider();
  resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepostory, fakeHashProvider)



  it('should be able to reset password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    });

    const { token } = await fakeUserTokensRepostory.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      password: '123123',
      token,
    })

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  })



  it('should not be able to reset the password with non existing token', async () => {
    await expect(resetPasswordService.execute({
      password: '123123',
      token: 'non-existing-token'
    })).rejects.toBeInstanceOf(AppError);
  })


  it('should not be able to reset the password with non existing user', async () => {

    const { token } = await fakeUserTokensRepostory.generate('non-existing-user')



    await expect(resetPasswordService.execute({
      password: '123456',
      token,
    })).rejects.toBeInstanceOf(AppError);
  })








  it('should not be able to reset password past 2 hours', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    });

    const { token } = await fakeUserTokensRepostory.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(resetPasswordService.execute({
      password: '123123',
      token,
    })).rejects.toBeInstanceOf(AppError)

  })
})
