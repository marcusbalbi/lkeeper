import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const routes = (): Router => {
  const routes = Router();

  const controller = new AuthController();

  routes.post('/login', (req, res) => controller.login(req, res));
  routes.delete('/logoff', (req, res) => controller.logoff(req, res));

  return routes;
};

export default routes;
