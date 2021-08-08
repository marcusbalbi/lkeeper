import userRoutes from '@src/api/routes/user.routes';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

const app = express();
const connection = createConnection({
  type: 'mysql',
  host: 'database_mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lkeeper',
  entities: ['src/database/entities/*.ts'],
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
});
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'LKeeper api' });
});
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Listening on 3000');
});
