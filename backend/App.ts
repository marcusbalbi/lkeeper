import express, { Express } from 'express';
import morgan from 'morgan';
import UserRoutes from '@src/api/routes/user.routes';
import AuthRoutes from '@src/api/routes/auth.routes';
import LinkRoutes from '@src/api/routes/link.routes';
import AuthMiddleware from '@src/api/middlewares/AuthMiddleware';
import { createConnection } from 'typeorm';

export default class ApplicationApi {
  private app: Express;
  constructor() {
    this.app = express();
    this.addBaseMiddlewares();
  }
  public async start(dbConfig): Promise<Express> {
    await createConnection(dbConfig);
    this.defineRoutes();
    return this.app;
  }
  private defineRoutes() {
    this.app.use('/', AuthRoutes());
    this.app.use('/users', UserRoutes());
    this.app.use('/links', AuthMiddleware, LinkRoutes());
    this.app.get('/', (req, res) => {
      res.json({ message: 'LKeeper api' });
    });
  }
  addBaseMiddlewares() {
    this.app.use(morgan(':method :url :status :response-time ms'));
    this.app.use(express.json());
  }
}
