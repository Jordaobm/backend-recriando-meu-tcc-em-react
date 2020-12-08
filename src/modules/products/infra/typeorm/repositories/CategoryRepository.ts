import { getRepository, Repository, In } from 'typeorm';

import ICategoryRepository from '../../../repositories/ICategoryRepository';
import ICreateCategoryDTO from '../../../dtos/ICreateCategoryDTO';

import Category from '../entities/Category';
import AppError from '@shared/errors/AppError';


class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    name
  }: ICreateCategoryDTO): Promise<Category> {

    const category = await this.ormRepository.create({
      name,
    })

    await this.ormRepository.save(category);

    return category;

  }

  public async findById(category_id: string): Promise<Category> {
    const category = await this.ormRepository.findOne(category_id);

    if (!category) {
      throw new AppError("Não existe essa categoria")
    }

    return category;
  }

  public async findAllCategory(): Promise<Category[]> {
    const category = await this.ormRepository.find();

    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name }
    });

    return category;
  }


}

export default CategoryRepository;
