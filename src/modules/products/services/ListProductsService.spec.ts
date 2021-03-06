import ListProductService from "./ListProductsService"
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from "./CreateProductService";
import FakeCategoryRepository from "../repositories/fakes/FakeCategoryRepository";
import CreateCategoryService from "./CreateCategoryService";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let listProduct: ListProductService;
let createProduct: CreateProductService;
let createCategory: CreateCategoryService;
let fakeCacheProvider: FakeCacheProvider;


describe('List Product Service', () => {

  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProduct = new ListProductService(fakeProductsRepository, fakeCacheProvider);
    createProduct = new CreateProductService(fakeProductsRepository, fakeCategoryRepository, fakeCacheProvider);
    createCategory = new CreateCategoryService(fakeCategoryRepository);
  })

  it('should be able to list all products', async () => {

    const category = await createCategory.execute({
      name: 'herbicidas'
    });

    await createProduct.execute({
      name: 'Produto',
      category_id: category.id,
      image_url: 'image.jpg',
      measure: '20L',
      price: 100,
      quantity: 10,
    });

    const products = await listProduct.execute()
    expect(products)

  })
})
