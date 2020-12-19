import ListProductsOfASpecificCategoryService from "@modules/products/services/ListProductsOfASpecificCategoryService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListProductsOfASpecificCategory {

    public async show(request: Request, response: Response): Promise<Response> {

        const {id} = request.params

        const findProducts = container.resolve(ListProductsOfASpecificCategoryService);

        const products = await findProducts.execute({
            id,
        })

        return response.json(products)
    }
}