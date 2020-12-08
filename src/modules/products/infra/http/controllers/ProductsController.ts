import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductService from '@modules/products/services/ListProductsService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity, image_url, category_id, measure } = request.body;

    const createProduct = await container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name, price, quantity, image_url, category_id, measure
    });

    return response.json(product);
  }


  public async show(request: Request, response: Response): Promise<Response> {

    const listProducts = await container.resolve(ListProductService);

    const products = await listProducts.execute()

    return response.json(products)

  }
}
