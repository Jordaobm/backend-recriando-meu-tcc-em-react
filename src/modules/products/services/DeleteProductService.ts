import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { inject, injectable } from "tsyringe";
import IProductsRepository from "../repositories/IProductsRepository";

interface IRequest {
    id: string;
    category_id:string;
}


@injectable()
export default class DeleteProductService {
    constructor(

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,

    ) { }

    public async execute({ id, category_id }: IRequest): Promise<void> {

        const product = await this.productsRepository.findById(id);        

        await this.cacheProvider.invalidate('AllProductsListCache')
        await this.cacheProvider.invalidate(`ListProductsOfASpecificCategory:${category_id}`)

        await this.productsRepository.delete(id);


    }
}