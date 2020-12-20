import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

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

  public async update(request: Request, response: Response): Promise<Response> {

    const { id, name, price, quantity, image_url, category_id, measure } = request.body;

    const updateProduct = await container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id, name, price, quantity, image_url, category_id, measure
    })

    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, category_id } = request.body;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({
      id, category_id
    })

    return response.json()

  }
}
