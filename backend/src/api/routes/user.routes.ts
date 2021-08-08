import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();

const controller = new UserController();

routes.get('/', controller.listAll);
routes.get('/:id', controller.getById);
routes.post('/', controller.create);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.remove);

export default routes;
