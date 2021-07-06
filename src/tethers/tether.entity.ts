import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
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

  @OneToMany(() => User, (user) => user.id, {
    eager: true,
  })
  tether_created_by: User;

  @Column('text')
  tether_created_by_plain: string;

  @OneToMany(() => User, (user) => user.id)
  participants: User[];

  @OneToMany(() => User, (user) => user.id)
  invitees: User[];

  @Column('text')
  tether_activity: string;

  @Column('int')
  tether_duration: number;

  @Column('text')
  tether_duration_noun: string;

  @Column()
  tether_frequency: TetherDuration;

  @Column()
  tether_timespan: number;
}
