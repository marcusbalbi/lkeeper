import { describe, expect, test } from '@jest/globals';
import appTest from '@root/tests/app-test';
describe('Auth test', () => {
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
      email: 'balbimarcus@gmail.com',
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
    const userInfo = {
      email: 'balbimarcus@gmail.com',
      password: 'abc123',
    };
    await app
      .post('/login')
      .send(userInfo)
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.token).toBeDefined();
      });
  });
});
