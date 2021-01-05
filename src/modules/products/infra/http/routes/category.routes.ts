import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import {celebrate, Segments, Joi} from 'celebrate';
import CategorySpecificController from '../controllers/CategorySpecificController';



const categoryRouter = Router();
const categoryController = new CategoryController();
const categorySpecificController = new CategorySpecificController();

categoryRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
    }
}), categoryController.create);

categoryRouter.get('/', categoryController.show);
categoryRouter.get('/:id', celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().required()
    }
}) , categorySpecificController.show)


export default categoryRouter;
