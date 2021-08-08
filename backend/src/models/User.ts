import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    select: true,
  })
  password: string;

  async hash(password): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
