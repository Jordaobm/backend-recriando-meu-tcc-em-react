import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';


const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ensureAuthenticated, ordersController.create);
ordersRouter.get('/:id', ordersController.show);

export default ordersRouter;
