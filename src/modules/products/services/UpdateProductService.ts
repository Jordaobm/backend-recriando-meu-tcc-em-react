import "reflect-metadata";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
    category_id: string;
    measure: string;
}


@injectable()
export default class UpdateProductService {
    constructor(

        @inject('ProductsRepository')
        private productRepository: IProductsRepository,

        @inject('CacheProvider')
        private cacheProvider:ICacheProvider,

    ) { }

    public async execute({ id, name, price, quantity, image_url, category_id, measure }: IRequest): Promise<Product> {

        const product = await this.productRepository.findById(id);

        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.image_url = image_url;
        product.category_id = category_id;
        product.measure = measure;

        const updateProduct = await this.productRepository.save(product);

        await this.cacheProvider.invalidate('AllProductsListCache')
        await this.cacheProvider.invalidate(`ListProductsOfASpecificCategory:${category_id}`)

        return updateProduct;
    }
}