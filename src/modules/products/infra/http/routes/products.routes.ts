import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Segments, Joi } from 'celebrate';
import ListProductsOfASpecificCategory from '../controllers/ListProductsOfASpecificCategoryController';

const productRouter = Router();
const productController = new ProductsController();
const listProductsOfASpecificCategory = new ListProductsOfASpecificCategory();

productRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.required(),
        quantity: Joi.required(),
        image_url: Joi.required(),
        category_id: Joi.required(),
        measure: Joi.required(),
    }
}), productController.create);
productRouter.get('/', productController.show)
productRouter.get('/category/:id', listProductsOfASpecificCategory.show)

export default productRouter;
