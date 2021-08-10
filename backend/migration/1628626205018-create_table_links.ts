import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableLinks1628626205018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE links(
    id integer(11) unsigned auto_increment primary key,
    title varchar(120) unique NOT NULL,
    link text NOT NULL,
    user_id integer(11) unsigned NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE links`);
  }
}
