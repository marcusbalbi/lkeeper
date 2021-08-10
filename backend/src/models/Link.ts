import CryptoJS from 'crypto-js';
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  link: string;

  @Column()
  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id' })
  @IsNotEmpty()
  user_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  public static createEncryptedLink(user: User, title: string, url: string): Link {
    const link = new Link();
    link.title = CryptoJS.AES.encrypt(title, user.getUserKey()).toString();
    link.link = CryptoJS.AES.encrypt(url, user.getUserKey()).toString();
    link.user_id = user.id;
    return link;
  }

  public encryptLink(user: User): Link {
    this.title = CryptoJS.AES.encrypt(this.title, user.getUserKey()).toString();
    this.link = CryptoJS.AES.encrypt(this.link, user.getUserKey()).toString();

    return this;
  }
  public decryptLink(user: User): Link {
    this.title = CryptoJS.AES.decrypt(this.title, user.getUserKey()).toString(CryptoJS.enc.Utf8);
    this.link = CryptoJS.AES.decrypt(this.link, user.getUserKey()).toString(CryptoJS.enc.Utf8);

    return this;
  }
}
