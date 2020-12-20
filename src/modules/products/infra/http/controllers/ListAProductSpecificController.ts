import ListAProductSpecificService from "@modules/products/services/ListAProductSpecificService";
import { Request, Response } from "express";
import { container } from "tsyringe";



export default class ListAProductSpecificController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listProduct = await container.resolve(ListAProductSpecificService);

        const product = await listProduct.execute({
            id,
        })

        return response.json(product);
    }
}