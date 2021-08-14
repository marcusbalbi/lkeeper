import { beforeAll, describe, expect, test } from '@jest/globals';
import { User } from '@root/src/models/User';
import appTest, { connectDB, login } from '@root/tests/app-test';
import faker from 'faker';
import { getRepository } from 'typeorm';

describe('Users Test', () => {
  const rawUserdata = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  let createdUser: User = null;
  beforeAll(async () => {
    await connectDB();
    createdUser = await getRepository(User, 'testing').create({ email: rawUserdata.email });
    await createdUser.setPassword(rawUserdata.password);
    await getRepository(User, 'testing').save(createdUser);
  });
  test('should create a new user', async () => {
    const app = await appTest();
    const data = { email: faker.internet.email(), password: faker.internet.password() };
    await app
      .post('/users/')
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual(data.email);
      });
  });
  test('should not create a user with a exists email', async () => {
    const app = await appTest();
    const data = { email: rawUserdata.email, password: faker.internet.password() };
    await app
      .post('/users/')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toContain('Email');
      });
  });
  test('should not create a user with incorrect data', async () => {
    const app = await appTest();
    const data = { email: faker.name.firstName(), password: '' };
    await app
      .post('/users/')
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBeDefined();
      });
  });
  test('should not update a user unauthenticated', async () => {
    const app = await appTest();
    const data = { password: 'TEST' };
    await app
      .put('/users/')
      .send(data)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBeDefined();
      });
  });
  test('should not update a user email', async () => {
    const app = await appTest();
    const nData = { ...rawUserdata };
    nData.email = 'newemail@test.com';
    await login(createdUser, app.put('/users/'))
      .send(nData)
      .expect(204)
      .then(async () => {
        const savedUser = await getRepository(User, 'testing').findOne({
          where: { email: nData.email },
        });
        expect(savedUser).toBeFalsy();
      });
  });
  test('should update a user', async () => {
    const app = await appTest();
    const nData = { ...rawUserdata };
    nData.password = '123456';
    await login(createdUser, app.put('/users/'))
      .send(nData)
      .expect(204)
      .then(async () => {
        const savedUser = await getRepository(User, 'testing').findOne({
          select: ['password', 'email'],
          where: { email: nData.email },
        });
        expect(savedUser.password).not.toEqual(createdUser.password);
      });
  });
});
