import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1628387776700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users(
    id integer(11) unsigned auto_increment primary key,
    email varchar(60) unique NOT NULL,
    password varchar(60) NOT NULL)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
