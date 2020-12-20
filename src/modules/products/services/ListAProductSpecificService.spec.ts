import ListAProductSpecificService from "./ListAProductSpecificService"
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

let fakeProductRepository: FakeProductsRepository;
let listAProductSpecificService: ListAProductSpecificService;

describe('ListAProductSpecificService', () => {



    beforeEach(() => {
        fakeProductRepository = new FakeProductsRepository();
        listAProductSpecificService = new ListAProductSpecificService(fakeProductRepository);

    })


    it('should be able to list a product specific', async () => {

        const product = await fakeProductRepository.create({
            name: 'produto 1',
            category_id: 'category_id',
            image_url: 'image.jpg',
            measure: '10 litros',
            price: 100,
            quantity: 10
        });


        const list = await listAProductSpecificService.execute({
            id: product.id
        });


        expect(list).toHaveProperty('name')


    })
})