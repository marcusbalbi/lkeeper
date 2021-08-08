import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  listAll(filter: any) {
    return getConnection().getRepository(User).find();
  }
}
