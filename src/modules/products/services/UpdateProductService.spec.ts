import UpdateProductService from "./UpdateProductService";
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";


let fakeProductRepository: FakeProductsRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateService: UpdateProductService;

describe('UpdateProductService', () => {

    beforeEach(() => {

        fakeCacheProvider = new FakeCacheProvider();
        fakeProductRepository = new FakeProductsRepository();
        updateService = new UpdateProductService(fakeProductRepository, fakeCacheProvider);

    })

    it('should be able to update product', async () => {


        const product = await fakeProductRepository.create({
            name: 'produto 1',
            category_id: 'category_id',
            image_url: 'image.jpg',
            measure: '10 litros',
            price: 100.99,
            quantity: 10,
        });

        const updateProduct = await updateService.execute({
            id: product.id,
            name: 'PRODUTO ATUALIZADO',
            category_id: 'category_id',
            image_url: 'IMAGE.JPG',
            measure: '10 LITROS',
            price: 200,
            quantity: 50,
        });

        const list = await fakeProductRepository.findAllProducts();

        expect(list)
    })
})