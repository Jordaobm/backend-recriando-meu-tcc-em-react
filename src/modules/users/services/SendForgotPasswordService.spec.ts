import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordService from './SendForgotPasswordService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let sendForgotPasswordService: SendForgotPasswordService;
let fakeUsersTokenRepository:FakeUserTokensRepository;
let fakeUserTokensRepostory:FakeUserTokensRepository;

describe('Send Forgot Email Service Test', () => {

  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUserTokensRepository();
    fakeUsersTokenRepository = new FakeUserTokensRepository();
    sendForgotPasswordService = new SendForgotPasswordService(fakeUsersRepository, fakeMailProvider, fakeUsersTokenRepository);
  })




  it('should be able to recover the password using the email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    })


    await sendForgotPasswordService.execute({
      email: user.email
    })

    expect(sendMail).toHaveBeenCalled()

  })


  it('should not be able to recover non-existing user', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');




    await expect(sendForgotPasswordService.execute({
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(AppError)

  })



  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client'
    })


    await sendForgotPasswordService.execute({
      email: user.email
    })

    expect(generateToken).toHaveBeenCalledWith(user.id);

  })
})
