import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository'
import ListProductsOfASpecificCategoryService from './ListProductsOfASpecificCategoryService';


let fakeProductsRepository: FakeProductsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProductsOfASpecificCategoryService: ListProductsOfASpecificCategoryService;
let fakeCategoryRepository: FakeCategoryRepository;

describe('ListProductsOfASpecificCategoryService', () => {

    beforeEach(() => {

        fakeCategoryRepository = new FakeCategoryRepository();
        fakeCacheProvider = new FakeCacheProvider();
        fakeProductsRepository = new FakeProductsRepository();
        listProductsOfASpecificCategoryService = new ListProductsOfASpecificCategoryService(fakeProductsRepository, fakeCacheProvider, fakeCategoryRepository);

    })



    it('should be able to list products of specific category', async () => {

        const product = await fakeProductsRepository.create({
            name: 'produto 1',
            price: 100,
            quantity: 10,
            measure: '10 Litros',
            image_url: 'image.jpg',
            category_id: 'category_id'
        })

        const listProducts = await listProductsOfASpecificCategoryService.execute({
            id:product.category_id,
        })

        console.log(listProducts)

        expect(listProducts)





    })

})