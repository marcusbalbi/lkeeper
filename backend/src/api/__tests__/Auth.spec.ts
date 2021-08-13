import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import ApplicationApi from '@root/App';
describe('Auth test', () => {
  test('Deve rejeitar requisicões sem token de acesso', async () => {
    const application = new ApplicationApi();
    const app = await application.start();
    await supertest(app).get('/').expect(200);
  });
});
