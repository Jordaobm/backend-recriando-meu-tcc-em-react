import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Category from "../infra/typeorm/entities/Category";
import ICategoryRepository from "../repositories/ICategoryRepository";

interface IRequest {
    id:string
}

@injectable()
class ListSpecificCategoryService {

    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) { }



    public async execute({ id }:IRequest):Promise<Category> {
        const category = await this.categoryRepository.findById(id);

        if(!category){
            throw new AppError('Não existe categoria com este id')
        }
        
        return category;
    }


}

export default ListSpecificCategoryService;