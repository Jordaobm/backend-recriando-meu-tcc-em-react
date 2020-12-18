import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from "./UpdateProfileService";


let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;


describe('Update Profile Service Test', () => {


  beforeEach(() => {
    
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
  })


  it('should be able to update user', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com'
    })

    expect(updatedUser.name).toBe('John Tre')
    expect(updatedUser.email).toBe('johntre@example.com')



  })





  it('should not be able to change your email to an already used email', async () => {

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      authorization: 'client',
    });


    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      authorization: 'client',
    });



    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(AppError);
  })





  it('should be able to update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      authorization: 'client',
    });



    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123123',
      old_password: '123456'
    })

    expect(updatedUser.password).toBe('123123')
  })


  it('should not be able to update the password if non-existing old_password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      authorization: 'client',
    });


    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  })



  it('should not be able to update if the old_password wrong', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      authorization: 'client',
    });


    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      old_password:'1231231',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update if the old_password wrong', async () => {

    expect(
      updateProfileService.execute({
        user_id:'non-existing-user',
        name:'John Doe',
        email:'johndoe@example.com',
        
      })
    )
  })


})
