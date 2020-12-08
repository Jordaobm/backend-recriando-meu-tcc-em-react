import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCategoryService from '@modules/products/services/CreateCategoryService';
import ListCategoriesService from '@modules/products/services/ListCategoriesService';

export default class CategoryController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = await container.resolve(CreateCategoryService);
    const category = await createCategory.execute({
      name
    });

    return response.json(category);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const listCategory = await container.resolve(ListCategoriesService);

    const category = await listCategory.execute()

    return response.json(category)

  }
}
