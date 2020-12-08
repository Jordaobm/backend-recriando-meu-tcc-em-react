import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category: string;
  measure: string;

}


@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository

  ) { }


  public async execute({ name, price, quantity, image_url, category, measure }: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if(productExists){
      throw new AppError('Produto já existe com o mesmo nome')
    }

    const product = await this.productsRepository.create({
      name, price, quantity, image_url, category, measure
    });


    return product;
  }



}

export default CreateProductService;

