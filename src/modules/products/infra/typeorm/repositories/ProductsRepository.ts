import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '../../../repositories/IProductsRepository';
import ICreateProductsDTO from '../../../dtos/ICreateProductsDTO';
import IUpdateProductsQuantityDTO from '../../../dtos/IUpdateProductsQuantityDTO';

import Product from '../entities/Product';


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
    category_id,
    measure
  }: ICreateProductsDTO): Promise<Product> {



    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
      image_url,
      category_id,
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
    const products = await this.ormRepository.find({
      relations: ['category']
    });

    return products;
  }


  public async findProductsSpecificCategory(id: string): Promise<Product[]> {

    const products = await this.ormRepository.find();

    const filterProducts = await products.filter(product=> product.category_id == id);

    return filterProducts;

  }

}

export default ProductsRepository;
