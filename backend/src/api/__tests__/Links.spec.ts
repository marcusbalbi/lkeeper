import { beforeAll, describe, expect, test } from '@jest/globals';
import { User } from '@root/src/models/User';
import appTest, { connectDB, login } from '@root/tests/app-test';
import { getRepository } from 'typeorm';
import faker from 'faker';
import { Link } from '@root/src/models/Link';

describe('Links api', () => {
  let userOne: User = null;
  let userTwo: User = null;
  beforeAll(async () => {
    // create 2 users
    await connectDB();
    userOne = await getRepository(User, 'testing').create({ email: faker.internet.email() });
    await userOne.setPassword('abc123');

    userTwo = await getRepository(User, 'testing').create({ email: faker.internet.email() });
    await userTwo.setPassword('abc123');

    await getRepository(User, 'testing').save(userOne);
    await getRepository(User, 'testing').save(userTwo);

    await getRepository(Link, 'testing').save(
      Link.createEncryptedLink(userOne, faker.name.title(), faker.internet.url()),
    );

    await getRepository(Link, 'testing').save(
      Link.createEncryptedLink(userTwo, faker.name.title(), faker.internet.url()),
    );
  });
  describe('success cenarios', () => {
    test('should create a link', async () => {
      const app = await appTest();
      const data = { title: 'Test', link: 'http://github.com' };
      await login(userOne, app.post('/links/'))
        .send(data)
        .expect(200)
        .then((response) => {
          expect(response.body.title).toEqual(data.title);
          expect(response.body.link).toEqual(data.link);
          expect(response.body.user_id).toEqual(userOne.id);
        });
    });
    test('should update a link', async () => {
      const app = await appTest();
      const link = await getRepository(Link, 'testing').findOne({ where: { user_id: userOne.id } });
      const data = { title: 'update test', link: 'http://google.com' };
      await login(userOne, app.put(`/links/${link.id}`))
        .send(data)
        .expect(204)
        .then(async () => {
          const updatedLink = await getRepository(Link, 'testing').findOne({
            where: { id: link.id },
          });
          expect(updatedLink.title).not.toEqual(link.title);
          expect(updatedLink.link).not.toEqual(link.link);
          expect(updatedLink.user_id).toEqual(link.user_id);
        });
    });
    test('should remove a link', async () => {
      const app = await appTest();
      const link = await getRepository(Link, 'testing').findOne({ where: { user_id: userOne.id } });
      await login(userOne, app.delete(`/links/${link.id}`))
        .expect(204)
        .then(async () => {
          const removed = await getRepository(Link, 'testing').findOne({
            where: { id: link.id },
          });
          expect(removed).toBeFalsy();
        });
    });
    test('should list all links', async () => {
      const app = await appTest();
      await login(userOne, app.get(`/links/`))
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBeTruthy();
          const links = response.body;
          links.forEach((link) => {
            expect(link.user_id).toEqual(userOne.id);
          });
        });
    });
    test('should get a link by id', async () => {
      const app = await appTest();
      const link = await getRepository(Link, 'testing').findOne({ where: { user_id: userOne.id } });
      await login(userOne, app.get(`/links/${link.id}`))
        .expect(200)
        .then((response) => {
          expect(response.body.id).toEqual(link.id);
        });
    });
    test('a link should be encrypted on db', async () => {
      const app = await appTest();
      const data = { title: 'Test', link: 'http://github.com' };
      await login(userOne, app.post('/links/'))
        .send(data)
        .expect(200)
        .then(async (response) => {
          const link = await getRepository(Link, 'testing').findOne({
            where: { id: response.body.id },
          });
          expect(link.title).not.toEqual(data.title);
          expect(link.link).not.toEqual(data.link);
        });
    });
  });
  describe('error cenarios', () => {
    test('should not accept unauthorized users', async () => {
      const app = await appTest();
      const data = { title: 'Test', link: 'http://github.com' };
      await app.post('/links/').send(data).expect(403);
    });
    test('should not create a link with invalid data', async () => {
      const app = await appTest();
      const data = { title: '', link: '' };
      await login(userOne, app.post('/links/')).send(data).expect(400);
    });
    test('should not update a link with invalid data', async () => {
      const app = await appTest();
      const link = await getRepository(Link, 'testing').findOne({ where: { user_id: userOne.id } });
      const data = { title: '', link: 'http://google.com' };
      await login(userOne, app.put(`/links/${link.id}`))
        .send(data)
        .expect(400);
    });
    test('should only show links from logged user', async () => {
      const app = await appTest();
      const link = await getRepository(Link, 'testing').findOne({
        where: { user_id: userTwo.id },
      });
      await login(userOne, app.get(`/links/${link.id}`)).expect(404);
    });
  });
});
