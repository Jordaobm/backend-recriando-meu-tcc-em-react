import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';
import UpdateProfileService from "./UpdateProfileService";


let fakeUsersRepository: FakeUsersRepository
let updateUserService: UpdateProfileService;
let showProfileService: ShowProfileService;

describe('Update Profile Service Test', () => {


  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  })


  it('should be able to show the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client',
    });

    const showProfile = showProfileService.execute({
      user_id: user.id
    })

    expect((await showProfile).name).toBe('John Doe')
    expect((await showProfile).email).toBe('johndoe@example.com')

  })

  it('should not be able to show the profile non existing user', async () => {


    await expect(showProfileService.execute({
      user_id: 'bla'
    })).rejects.toBeInstanceOf(AppError)

  })
})
