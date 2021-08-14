import ApplicationApi from '@root/App';
import supertest from 'supertest';
import { configTest } from '@src/config/database';

let app = null;
const application = new ApplicationApi();
export default async () => {
  app = app ?? (await application.start(configTest));
  return supertest(app);
};
