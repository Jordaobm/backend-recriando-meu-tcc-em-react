import { v4 as uuidv4 } from "uuid";
import ICreateProductsDTO from "@modules/products/dtos/ICreateProductsDTO";
import IUpdateProductsQuantityDTO from "@modules/products/dtos/IUpdateProductsQuantityDTO";
import Product from "@modules/products/infra/typeorm/entities/Product";
import IProductsRepository from "../IProductsRepository";
import AppError from "@shared/errors/AppError";
import IUpdateProductDTO from "@modules/products/dtos/IUpdateProductDTO";


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

  public async findById(id: string): Promise<Product> {
    const product = this.products.find(product => product.id == id);

    if (!product) {
      throw new AppError('Não existe produto com esse id')
    }

    return product
  }

  public async save(product: Product): Promise<Product> {

    const findIndex = this.products.findIndex(product => product.id == product.id)

    this.products[findIndex] = product;

    return product;

  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.products.findIndex(product => product.id == id);

    this.products.splice(findIndex, 1);

  }





}

export default ProductsRepository;
