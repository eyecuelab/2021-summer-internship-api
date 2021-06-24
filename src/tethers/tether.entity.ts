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
  tether_id: string;

  @Column('text')
  tether_name: string;

  @CreateDateColumn()
  tether_opened_on?: Date;

  @CreateDateColumn()
  tether_completed_on?: Date;

  @CreateDateColumn()
  tether_full_on?: Date;

  @Column('text')
  tether_created_by: string;

  @ManyToOne(() => User, (user) => user.tethers)
  user: User;

  @Column('text')
  tether_action: string;

  @Column('int')
  tether_quantity: number;

  @Column('text')
  tether_noun: string;

  @Column()
  tether_duration: TetherDuration;
}
