import { beforeAll, describe, expect, test } from '@jest/globals';
import { User } from '@root/src/models/User';
import { connectDB } from '@root/tests/app-test';
import { getRepository } from 'typeorm';
import faker from 'faker';
import { Link } from '@root/src/models/Link';

describe('Links api', () => {
  let userOne: User = null;
  let userTwo: User = null;
  beforeAll(async () => {
    // create 2 users
    await connectDB();
    userOne = await getRepository(User, 'testing').create({ email: faker.internet.email });
    await userOne.setPassword('abc123');

    userTwo = await getRepository(User, 'testing').create({ email: faker.internet.email });
    await userOne.setPassword('abc123');

    await getRepository(User, 'testing').save(userOne);
    await getRepository(User, 'testing').save(userTwo);

    await getRepository(Link, 'testing').save(
      Link.createEncryptedLink(userOne, faker.name.title, faker.internet.url),
    );

    await getRepository(Link, 'testing').save(
      Link.createEncryptedLink(userTwo, faker.name.title, faker.internet.url),
    );
  });
  describe('success cenarios', () => {
    test('should create a link', () => {});
    test('should update a link', () => {});
    test('should remove a link', () => {});
    test('should list all links', () => {});
    test('should get a link by id', () => {});
    test('a link should be encrypted on db', () => {});
  });
  describe('error cenarios', () => {
    test('should not accept unauthorized users', () => {});
    test('should not create a link with invalid data', () => {});
    test('should not update a link with invalid data', () => {});
    test('should only show links from logged user', () => {});
  });
});
