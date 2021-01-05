import ListSpecificCategoryService from "@modules/products/services/ListSpecificCategoryService";
import { Request, Response } from "express";
import { container } from "tsyringe";


class CategorySpecificController {
    public async show(request: Request, response: Response): Promise<Response> {

        const categoryId = request.params;

        const listCategory = await container.resolve(ListSpecificCategoryService);

        const category = await listCategory.execute({
            id:categoryId,
        })

        return response.json(category);

        

        

    }
}

export default CategorySpecificController