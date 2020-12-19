import FakeCategoryRepository from "../repositories/fakes/FakeCategoryRepository"
import CreateProductService from "./CreateProductService";
import FakeProductRepository from '../repositories/fakes/FakeProductsRepository';
import AppError from "@shared/errors/AppError";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";


let fakeCategoryRepository: FakeCategoryRepository;
let fakeProductRepository: FakeProductRepository;
let fakeCacheProvider: FakeCacheProvider;
let createProduct: CreateProductService;



describe('Create Product Service Test', () => {

  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductRepository = new FakeProductRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    createProduct = new CreateProductService(fakeProductRepository, fakeCategoryRepository, fakeCacheProvider);

  })

  it('should be able to create a new product', async () => {

    const category = await fakeCategoryRepository.create({
      name: 'herbicidas'
    });

    const product = await createProduct.execute({
      name: 'Produto 1',
      price: 100,
      category_id: category.id,
      image_url: 'https://bra-agroquimica.com.br/wp-content/uploads/2017/09/bra-agroquimica-grassato-20-litros.png',
      measure: '20 litros',
      quantity: 5
    })

    expect(product.name).toBe('Produto 1');

  })

  it('should not be able to create a new product if the category does not exist', async () => {

    expect(createProduct.execute({
      name: 'Produto 1',
      price: 100,
      category_id: 'categoria-inválida',
      image_url: 'https://bra-agroquimica.com.br/wp-content/uploads/2017/09/bra-agroquimica-grassato-20-litros.png',
      measure: '20 litros',
      quantity: 5
    })).rejects.toBeInstanceOf(AppError);

  })



  it('should not be able to create a new product with the same name', async () => {

    const category = await fakeCategoryRepository.create({
      name: 'herbicidas'
    });

    await createProduct.execute({
      name: 'Produto',
      price: 100,
      category_id: category.id,
      image_url: 'https://bra-agroquimica.com.br/wp-content/uploads/2017/09/bra-agroquimica-grassato-20-litros.png',
      measure: '20 litros',
      quantity: 5
    })

    expect(createProduct.execute({
      name: 'Produto',
      price: 100,
      category_id: category.id,
      image_url: 'https://bra-agroquimica.com.br/wp-content/uploads/2017/09/bra-agroquimica-grassato-20-litros.png',
      measure: '20 litros',
      quantity: 5
    })).rejects.toBeInstanceOf(AppError);

  })



})
