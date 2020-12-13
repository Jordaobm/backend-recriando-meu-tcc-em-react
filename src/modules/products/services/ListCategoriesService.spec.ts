import FakeCategoryRepository from "../repositories/fakes/FakeCategoryRepository";
import CreateCategoryService from "./CreateCategoryService";
import ListCategoriesService from "./ListCategoriesService";


let fakeCategoryRepository:FakeCategoryRepository;
let createCategory:CreateCategoryService;
let listCategories:ListCategoriesService;

describe('List Categories Service Test', () => {

  beforeEach(()=>{

    fakeCategoryRepository = new FakeCategoryRepository();
    listCategories = new ListCategoriesService(fakeCategoryRepository);
    createCategory = new CreateCategoryService(fakeCategoryRepository);

  })



  it('should be able to list categories', async () => {

    await createCategory.execute({
      name:'herbicidas'
    })

    await createCategory.execute({
      name:'inseticidas'
    })


    const categories = await listCategories.execute();
    expect(categories.length == 2)

  })
})
