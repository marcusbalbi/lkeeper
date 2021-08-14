import ApplicationApi from '@root/App';
import supertest from 'supertest';
import { User } from '@root/src/models/User';
import jwt from 'jsonwebtoken';
import jwtConfig from '@src/config/jwt';
import config from '@root/ormconfig.json';
import { Connection, createConnection } from 'typeorm';
let request = null;
const application = new ApplicationApi();

export const login = (user: User, req) => {
  const token = jwt.sign(
    {
      user,
      exp: jwtConfig.exp_time,
    },
    jwtConfig.secret,
  );
  req.set('authorization', `Bearer ${token}`);
  return req;
};

export const connectDB = async () => {
  await createConnection('testing');
};

export default async () => {
  if (request === null) {
    const testingCOnfig = { ...config[1] };
    testingCOnfig.name = undefined;
    const app = await application.start(testingCOnfig);
    request = supertest(app);
  }
  return request;
};
