import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import "reflect-metadata";
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(): Promise<Product[]> {

    let products = await this.cacheProvider.recover<Product[]>('AllProductsListCache')

    if (!products) {
      products = await this.productsRepository.findAllProducts();

      console.log('A query foi feita no banco')

      await this.cacheProvider.save('AllProductsListCache', products)
    }

    return products;
  }



}

export default ListProductService;

