import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const routes = (): Router => {
  const routes = Router();

  const controller = new UserController();

  routes.get('/', AuthMiddleware, (req, res) => controller.listAll(req, res));
  routes.get('/:id', (req, res) => controller.getById(req, res));
  routes.post('/', (req, res) => controller.create(req, res));
  routes.put('/:id', (req, res) => controller.update(req, res));
  routes.delete('/:id', (req, res) => controller.remove(req, res));

  return routes;
};

export default routes;
