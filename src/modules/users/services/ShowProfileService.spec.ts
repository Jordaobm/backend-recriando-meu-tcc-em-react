import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from "./UpdateProfileService";


let fakeUsersRepository: FakeUsersRepository
let updateUserService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('Update Profile Service Test', () => {


  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
  })


  it('should be able to update user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com'
    })

    expect(updatedUser.name).toBe('John Tre')
    expect(updatedUser.email).toBe('johntre@example.com')



  })

})
