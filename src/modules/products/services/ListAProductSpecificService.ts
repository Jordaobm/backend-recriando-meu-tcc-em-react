import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";

interface IRequest {
    id: string;
}

@injectable()
export default class ListAProductSpecificService {
    constructor(

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository


    ) {

    }

    public async execute({ id }: IRequest): Promise<Product> {

        const product = await this.productsRepository.findById(id);

        return product;

    }
}