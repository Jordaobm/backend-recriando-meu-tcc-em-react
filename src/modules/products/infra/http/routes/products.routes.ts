import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import {celebrate, Segments, Joi} from 'celebrate';

const productRouter = Router();
const productController = new ProductsController();

productRouter.post('/', celebrate({
    [Segments.BODY]: {
        name:Joi.string().required(),
        price:Joi.required(),
        quantity:Joi.required(),
        image_url:Joi.required(),
        category_id:Joi.required(),
        measure:Joi.required(),
    }
}), productController.create);
productRouter.get('/', productController.show)

export default productRouter;
