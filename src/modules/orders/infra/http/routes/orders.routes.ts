import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import {celebrate, Segments, Joi} from 'celebrate';


const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/', ensureAuthenticated, celebrate({
    [Segments.BODY]: {
        products: Joi.array().required(),
    }
}), ordersController.create);
ordersRouter.get('/:id',  celebrate({
    [Segments.PARAMS]: {
        id:Joi.string().uuid().required()
    }
}), ordersController.show);

export default ordersRouter;
