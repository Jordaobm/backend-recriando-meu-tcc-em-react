import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { inject, injectable } from "tsyringe";
import Product from "../infra/typeorm/entities/Product";
import ICategoryRepository from "../repositories/ICategoryRepository";
import IProductsRepository from "../repositories/IProductsRepository";

interface IRequest {
    id: string;
}

@injectable()
export default class ListProductsOfASpecificCategoryService {
    constructor(

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,

        @inject('CategoryRepository')
        private categoryRepository:ICategoryRepository,

    ) { }

    public async execute({ id }: IRequest): Promise<Product[]> {

        const category = await this.categoryRepository.findById(id);

        let products = await this.cacheProvider.recover<Product[]>(`ListProductsOfASpecificCategory:${id}`)

        if (!products) {

            products = await this.productsRepository.findProductsSpecificCategory(id);

            console.log('A query foi feita no banco')

            await this.cacheProvider.save(`ListProductsOfASpecificCategory:${id}`, products)
        }


        return products;



    }
}