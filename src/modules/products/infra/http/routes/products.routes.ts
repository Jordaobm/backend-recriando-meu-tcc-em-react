import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Segments, Joi } from 'celebrate';
import ListProductsOfASpecificCategory from '../controllers/ListProductsOfASpecificCategoryController';
import ListAProductSpecificController from '../controllers/ListAProductSpecificController';

const productRouter = Router();
const productController = new ProductsController();
const listProductsOfASpecificCategory = new ListProductsOfASpecificCategory();
const listAProductSpecificController = new ListAProductSpecificController();

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
productRouter.get('/', productController.show);
productRouter.put('/update', productController.update);
productRouter.delete('/', productController.delete);

productRouter.get('/category/:id', listProductsOfASpecificCategory.show);
productRouter.get('/specific/:id', listAProductSpecificController.show);




export default productRouter;
