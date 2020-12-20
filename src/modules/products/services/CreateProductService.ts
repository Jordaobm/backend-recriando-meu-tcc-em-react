import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICategoryRepository from '../repositories/ICategoryRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category_id: string;
  measure: string;
}


@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }


  public async execute({ name, price, quantity, image_url, category_id, measure }: IRequest): Promise<Product> {

    let categoryExists = await this.categoryRepository.findById(category_id);

    if (!categoryExists) {
      throw new AppError('Categoria inválida')
    }


    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      ''
      throw new AppError('Produto já existe com o mesmo nome')
    }

    const product = await this.productsRepository.create({
      name, price, quantity, image_url, category_id: categoryExists.id, measure
    });

    await this.cacheProvider.invalidate('AllProductsListCache')
    await this.cacheProvider.invalidate(`ListProductsOfASpecificCategory:${category_id}`)

    return product;
  }



}

export default CreateProductService;

