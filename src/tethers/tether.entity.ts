import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TetherDuration } from './tether-duration.enum';

@Entity('tether')
export class Tether {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @CreateDateColumn()
  opened_on?: Date;

  @CreateDateColumn()
  completed_on?: Date;

  @CreateDateColumn()
  full_on?: Date;

  @Column('text')
  created_by: string;

  @ManyToOne(() => User, (user) => user.tethers)
  user: User;

  @Column('text')
  action: string;

  @Column('int')
  quantity: number;

  @Column('text')
  noun: string;

  @Column()
  duration: TetherDuration;
}
