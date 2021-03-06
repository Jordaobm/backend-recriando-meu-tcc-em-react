import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindOrderService from '@modules/orders/services/FindOrderService';
import CreateOrderService from '@modules/orders/services/CreateOrderService';


export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params

    const findOrder = container.resolve(FindOrderService)

    const order = await findOrder.execute({ id });

    console.log(order)

    return response.json(order)

  }

  public async create(request: Request, response: Response): Promise<Response> {

    const { products } = request.body;

    const user_id = request.user.id;

    const createOrder = container.resolve(CreateOrderService)

    const orders = await createOrder.execute({
      user_id,
      products,
    });

    return response.json(orders)
  }

}
