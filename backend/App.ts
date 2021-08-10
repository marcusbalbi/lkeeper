import express from 'express';
import morgan from 'morgan';
import ConnectionFactory from '@src/database/ConnectionFactory';
import userRoutes from '@src/api/routes/user.routes';
import AuthRoutes from '@src/api/routes/auth.routes';
import AuthMiddleware from '@src/api/middlewares/AuthMiddleware';

export default class ApplicationApi {
  private app;
  constructor() {
    this.app = express();
    this.addBaseMiddlewares();
  }
  public async start(port, cb = null) {
    await ConnectionFactory.createConnection();
    this.defineRoutes();
    this.app.listen(port, () => {
      console.log(`Listening on ${port}`);
      if (typeof cb === 'function') {
        cb(this.app);
      }
    });
  }
  private defineRoutes() {
    this.app.use('/', AuthRoutes());
    this.app.use('/users', AuthMiddleware, userRoutes());
    this.app.get('/', (req, res) => {
      res.json({ message: 'LKeeper api' });
    });
  }
  addBaseMiddlewares() {
    this.app.use(morgan(':method :url :status :response-time ms'));
    this.app.use(express.json());
  }
}
