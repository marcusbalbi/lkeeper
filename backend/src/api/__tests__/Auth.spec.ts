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
      .post('/login', userInfo)
      .expect(403)
      .then((response) => {
        const data = response.body;
        expect(data.message).toContain('not found');
      });
  });
});
