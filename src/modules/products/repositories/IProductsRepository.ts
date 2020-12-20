import Product from '../infra/typeorm/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductsDTO';
import IUpdateProductsQuantityDTO from '../dtos/IUpdateProductsQuantityDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product | undefined>;
  findAllById(product: IFindProducts[]): Promise<Product[]>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>
  findAllProducts(): Promise<Product[]>;
  findProductsSpecificCategory(id: string): Promise<Product[]>
  findById(id: string): Promise<Product>
  save(data: IUpdateProductDTO): Promise<Product>
  delete(id: string): Promise<void>;
}
