import userRoutes from '@src/api/routes/user.routes';
import AuthRoutes from '@src/api/routes/auth.routes';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import AuthMiddleware from '@src/api/middlewares/AuthMiddleware';
const app = express();
const connection = createConnection({
  type: 'mysql',
  host: 'database_mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lkeeper',
  entities: ['src/models/*.ts'],
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
});
connection.then(() => {
  console.log('connected do database');
  app.use('/', AuthRoutes());
  app.use('/users', AuthMiddleware, userRoutes());
});
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'LKeeper api' });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
