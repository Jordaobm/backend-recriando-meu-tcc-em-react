import { v4 as uuidv4 } from "uuid";
import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';
import Category from '@modules/products/infra/typeorm/entities/Category';
import ICategoryRepository from '../ICategoryRepository';


class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];


  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {

    const category = new Category();

    Object.assign(category, {
      id: uuidv4(),


    }, categoryData)

    this.categories.push(category);

    return category;
  }

  public async findById(category_id: string): Promise<Category | undefined> {

    const category = this.categories.find(category => category.id == category_id);

    return category;
  }

  public async findAllCategory(): Promise<Category[]> {
    return this.categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name == name);

    return category;
  }


}

export default FakeCategoryRepository;
