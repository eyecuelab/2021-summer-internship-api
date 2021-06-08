import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  pictureURL: string;

  @Column('text')
  date: string;

  @Column('int')
  rating: number;

  @CreateDateColumn()
  created_at?: Date;

  @CreateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}
