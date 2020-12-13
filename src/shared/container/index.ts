import { container } from 'tsyringe';
import '@modules/users/providers/index';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import ICategoryRepository from '@modules/products/repositories/ICategoryRepository';
import CategoryRepository from '@modules/products/infra/typeorm/repositories/CategoryRepository';

import IOrdesRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);


container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);


container.registerSingleton<IOrdesRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

