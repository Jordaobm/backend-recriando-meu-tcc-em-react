import "reflect-metadata";
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository

  ) { }

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAllProducts();

    return products;
  }



}

export default ListProductService;

