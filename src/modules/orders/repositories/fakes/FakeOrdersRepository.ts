import { v4 as uuidv4 } from "uuid";
import ICreateOrderDTO from "@modules/orders/dtos/ICreateOrderDTO";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "../IOrdersRepository";

class OrdersRepository implements IOrdersRepository {

  private orders: Order[] = [];

  public async create(dataOrders: ICreateOrderDTO): Promise<Order> {
    const order = new Order();
    Object.assign(order, {
      id: uuidv4(),
    }, dataOrders)

    this.orders.push(order)

    return order

  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.orders.find(order=> order.id == id)

    return order;
  }
}

export default OrdersRepository;
