import "reflect-metadata";
import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Order from "../infra/typeorm/entities/Order";
import IOrdersRepository from "../repositories/IOrdersRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";


interface IProducts {
  id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  products: IProducts[];
}


@injectable()
class CreateOrderService {

  constructor(

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

  ) { }

  public async execute({ user_id, products }: IRequest): Promise<Order> {

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('Cliente não cadastrado!')
    }

    const existentsProducts = await this.productsRepository.findAllById(
      products,
    )

    if (!existentsProducts.length) {
      throw new AppError('Não existe produto com este ID');
    }

    const existentProductsIds = existentsProducts.map(product => product.id)

    const checkInexistentProduct = products.filter(product => !existentProductsIds.includes(product.id))

    if (checkInexistentProduct.length) {
      throw new AppError(`Não encontramos o(s) produto(s) ${checkInexistentProduct[0].id}`)
    }

    const findProdcutsWithNoQuantityAvailable = products.filter(
      product =>
        existentsProducts.filter(p => p.id == product.id)[0].quantity < product.quantity
    )

    if (findProdcutsWithNoQuantityAvailable.length) {
      throw new AppError(`A quantidade ${findProdcutsWithNoQuantityAvailable[0].quantity} não é permitida para ${findProdcutsWithNoQuantityAvailable[0].id}`)
    }

    const seriealizedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentsProducts.filter(p => p.id == product.id)[0].price,

    }))

    const order = await this.ordersRepository.create({
      user: userExists,
      products: seriealizedProducts,
    })

    const { order_products } = order;

    const orderedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existentsProducts.filter(p => p.id == product.product_id)[0].quantity - product.quantity
    }));

    await this.productsRepository.updateQuantity(orderedProductsQuantity);


    await this.notificationsRepository.create({
      recipient_id:userExists.id,
      content:`Um novo pedido foi realizado`
    })

    return order;
  }

}

export default CreateOrderService;
