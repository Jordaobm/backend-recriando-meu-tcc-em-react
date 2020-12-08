import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';



const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', categoryController.create);
categoryRouter.get('/', categoryController.show);

export default categoryRouter;
