import userRoutes from '@src/api/routes/user.routes';
import express from 'express';
import morgan from 'morgan';
// import connectionFactory from './src/infra/db/connection';

const app = express();

// connectionFactory('app.db').then(() => console.log('connected'));
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'LKeeper api' });
});
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Listening on 3000');
});
