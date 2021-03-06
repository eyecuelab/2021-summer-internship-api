import { User } from '../users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TetherFrequency } from './tether-frequency.enum';
import { Participant } from 'src/participants/participant.entity';
import { TetherCategory } from './tether-category.enum';

@Entity('tether')
export class Tether {
  @PrimaryGeneratedColumn('uuid')
  tether_id: string;

  @Column('text')
  tether_name: string;

  @CreateDateColumn()
  tether_opened_on?: Date;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  tether_completed_on?: Date;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  tether_full_on?: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  tether_created_by: string;

  @Column('text')
  tether_created_by_plain: string;

  @OneToMany(() => Participant, (participant) => participant.tether_id)
  @JoinColumn()
  participant_id: Participant;

  @OneToMany(() => User, (user) => user.id)
  invitees: User[];

  @Column('text')
  tether_activity: string;

  @Column('int')
  tether_duration: number;

  @Column('text')
  tether_duration_noun: string;

  @Column()
  tether_frequency: TetherFrequency;

  @Column('int')
  tether_timespan: number;

  @Column({ nullable: true })
  tether_category: TetherCategory;
}
