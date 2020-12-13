import 'reflect-metadata';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import AppError from '@shared/errors/AppError';

let fakeCategoryRepository: FakeCategoryRepository;
let createCategory: CreateCategoryService;

describe('Create Category', () => {


  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    createCategory = new CreateCategoryService(fakeCategoryRepository)
  })

  it('should be able to create a new category', async () => {

    const category = await createCategory.execute({
      name: 'uma categoria',
    })

    expect(category).toHaveProperty('id');
  })

  it('should not be able to create a new category if one already exists with the same name ', async () => {

    await createCategory.execute({
      name: 'uma categoria',
    })


    expect(createCategory.execute({
      name: 'uma categoria',
    })).rejects.toBeInstanceOf(AppError);
  })
});
