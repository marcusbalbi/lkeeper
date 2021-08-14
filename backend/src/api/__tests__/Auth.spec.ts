import { beforeAll, describe, expect, test } from '@jest/globals';
import { User } from '@root/src/models/User';
import appTest, { connectDB } from '@root/tests/app-test';
import { getRepository } from 'typeorm';
import faker from 'faker';
describe('Auth test', () => {
  const rawUserdata = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  beforeAll(async () => {
    // transform to a fixture
    await connectDB();
    const user = await getRepository(User, 'testing').create({ email: rawUserdata.email });
    await user.setPassword(rawUserdata.password);
    await getRepository(User, 'testing').save(user);
  });
  test('should return error when user not found', async () => {
    const app = await appTest();
    const userInfo = {
      email: 'invalidemail@gmail.com',
      password: 'invalidPass',
    };
    await app
      .post('/login', userInfo)
      .send(userInfo)
      .expect(403)
      .then((response) => {
        const data = response.body;
        expect(data.message).toContain('not found');
      });
  });
  test('should return error when user or password not sent', async () => {
    const app = await appTest();
    const userInfo = {};
    await app
      .post('/login')
      .send(userInfo)
      .expect(403)
      .then((response) => {
        const data = response.body;
        expect(data.message).toContain('not found');
      });
  });
  test('should return error when incorrect password', async () => {
    const app = await appTest();
    const userInfo = {
      email: rawUserdata.email,
      password: '',
    };
    await app
      .post('/login')
      .send(userInfo)
      .expect(403)
      .then((response) => {
        const data = response.body;
        expect(data.message).toContain('not found');
      });
  });

  test('should login correctly', async () => {
    const app = await appTest();
    const data = await getRepository(User, 'testing').findAndCount();
    await app
      .post('/login')
      .send(rawUserdata)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.token).toBeDefined();
      });
  });
});
