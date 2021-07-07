import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Tether } from 'src/tethers/tether.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tether)
  @JoinColumn()
  tether_id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user_id: string;

  @Column({ nullable: false })
  links_total: number;

  @Column({ nullable: false })
  links_completed: number;
}
