import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import {celebrate, Segments, Joi} from 'celebrate';



const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
    }
}), categoryController.create);

categoryRouter.get('/', categoryController.show);

export default categoryRouter;
