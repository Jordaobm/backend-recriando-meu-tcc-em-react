import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import productRouter from '@modules/products/infra/http/routes/products.routes';
import categoryRouter from '@modules/products/infra/http/routes/category.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';




const routes = Router();


routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/product', productRouter);
routes.use('/category', categoryRouter);
routes.use('/orders', ordersRouter);



export default routes;
