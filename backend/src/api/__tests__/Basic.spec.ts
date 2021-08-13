import { describe, expect, test } from '@jest/globals';
import appTest from '@root/tests/app-test';
describe('Basic test', () => {
  test('Deve retornar algo em /', async () => {
    const app = await appTest();
    await app
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBeDefined();
      });
  });
});
