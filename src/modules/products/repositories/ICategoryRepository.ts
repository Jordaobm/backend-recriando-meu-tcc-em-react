import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';


export default interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findById(category_id: string): Promise<Category | undefined>;
  findAllCategory(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}
