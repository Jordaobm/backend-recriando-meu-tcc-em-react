import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import OrdersProduct from '@modules/orders/infra/typeorm/entities/OrdersProducts'


@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrdersProduct, order_product => order_product.order, {
    cascade: true,
  })
  order_products: OrdersProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Order;

