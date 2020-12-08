import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import ICategoryRepository from '@modules/products/repositories/ICategoryRepository';
import CategoryRepository from '@modules/products/infra/typeorm/repositories/CategoryRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);


container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);
