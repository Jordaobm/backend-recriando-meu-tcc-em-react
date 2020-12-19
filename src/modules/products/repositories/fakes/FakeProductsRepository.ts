import { v4 as uuidv4 } from "uuid";
import ICreateProductsDTO from "@modules/products/dtos/ICreateProductsDTO";
import IUpdateProductsQuantityDTO from "@modules/products/dtos/IUpdateProductsQuantityDTO";
import Product from "@modules/products/infra/typeorm/entities/Product";
import IProductsRepository from "../IProductsRepository";


class ProductsRepository implements IProductsRepository {

  private products: Product[] = [];


  public async create(dataProduct: ICreateProductsDTO): Promise<Product> {

    const product = new Product();
    Object.assign(product, {
      id: uuidv4(),


    }, dataProduct)

    this.products.push(product);

    return product;

  }

  public async findByName(name: string): Promise<Product | undefined> {

    const product = this.products.find(product => product.name == name);

    return product;
  }

  public async findAllById(requestProducts: Product[]): Promise<Product[]> {

    const products = requestProducts.map(product => product.id == '');

    if (!products) {
      return []
    }

    return requestProducts

  }

  public async updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]> {

    return this.products;
  }

  public async findAllProducts(): Promise<Product[]> {


    return this.products;
  }

  public async findProductsSpecificCategory(id: string): Promise<Product[]> {
    const products = this.products.filter(product => product.category_id == id);

    return products
  }




}

export default ProductsRepository;
