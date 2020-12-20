import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';


let fakeProductsRepository: FakeProductsRepository;
let fakeCacheProvider: FakeCacheProvider;
let deleteProductService: DeleteProductService;

describe('DeleteProductService', () => {

    beforeEach(() => {

        fakeCacheProvider = new FakeCacheProvider();
        fakeProductsRepository = new FakeProductsRepository();
        deleteProductService = new DeleteProductService(fakeProductsRepository, fakeCacheProvider);

    })

    it('should be able to delete the product', async () => {

        const product = await fakeProductsRepository.create({
            name: 'produto 1',
            category_id: 'category_id',
            image_url: 'image.jpg',
            measure: '10 litros',
            price: 100,
            quantity: 10
        });

        let list = await fakeProductsRepository.findAllProducts();



        const deleteProduct = await deleteProductService.execute({
            id:product.id,
            category_id:product.category_id
        });


        list = await fakeProductsRepository.findAllProducts();


        expect(list).toEqual([])

        

    })
})