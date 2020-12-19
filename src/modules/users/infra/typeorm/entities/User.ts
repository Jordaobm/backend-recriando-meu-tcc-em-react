import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';


@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  authorization: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (this.avatar != 'http://localhost:3333/files/bdb59e47dbc7e558d572-john%20doe.png') {
      return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
    return null

  }
}

export default User;
