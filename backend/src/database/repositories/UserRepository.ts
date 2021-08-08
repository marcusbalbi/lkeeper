import UserRepositoryInterface from '@src/domain/UserRepositoryInterface';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository implements UserRepositoryInterface {
  listAll(filter: any) {
    return getConnection().getRepository(User).find();
  }
  findById(id: any) {
    return getConnection().getRepository(User).findOne({
      where: {
        id,
      },
    });
  }
  findByEmail(email: string) {
    return getConnection().getRepository(User).findOne({
      where: {
        email,
      },
    });
  }
  save(filter: any) {}
}
