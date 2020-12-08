import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '../../../repositories/IProductsRepository';
import ICreateProductsDTO from '../../../dtos/ICreateProductsDTO';
import IUpdateProductsQuantityDTO from '../../../dtos/IUpdateProductsQuantityDTO';

import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';


interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
    image_url,
    category,
    measure
  }: ICreateProductsDTO): Promise<Product> {

    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
      image_url,
      category,
      measure
    })

    await this.ormRepository.save(product);

    return product;

  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name }
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existentProduct = await this.ormRepository.find({
      where: {
        id: In(productsIds)
      }
    });

    return existentProduct;
  }

  public async updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]> {
    return this.ormRepository.save(products);
  }



  public async findAllProducts(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

}

export default ProductsRepository;
