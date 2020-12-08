import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
}


@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository

  ) { }


  public async execute({ name }: IRequest): Promise<Category> {
    const categoryExists = await this.categoryRepository.findByName(name);

    if(categoryExists){
      throw new AppError('Já consta uma categoria com este nome na base')
    }

    const category = await this.categoryRepository.create({
      name,
    });


    return category;
  }



}

export default CreateCategoryService;

