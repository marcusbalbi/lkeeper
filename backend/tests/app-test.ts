import ApplicationApi from '@root/App';
import supertest from 'supertest';
import { configTest } from '@src/config/database';

export default async () => {
  const application = new ApplicationApi();
  const app = await application.start(configTest);
  return supertest(app);
};
