import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../src/models/User';

export class addAdminUserToUsers1628558983938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.email = 'balbimarcus@gmail.com';
    await user.setPassword('abc123');
    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    getRepository(User).delete({
      email: 'balbimarcus@gmail.com',
    });
  }
}
