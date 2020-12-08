import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productRouter = Router();
const productController = new ProductsController();

productRouter.post('/', productController.create);
productRouter.get('/', productController.show)

export default productRouter;
