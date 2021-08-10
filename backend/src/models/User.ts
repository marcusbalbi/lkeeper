import bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Link } from './Link';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  async setPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    this.password = hash;
  }

  async compare(password): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  getUserKey(): string {
    return `${this.id}.${this.email}`;
  }

  public static create(data: any): User {
    const user = new User();
    user.id = data.id;
    user.email = data.email;

    return user;
  }
}
