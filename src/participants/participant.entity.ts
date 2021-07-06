import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Tether } from 'src/tethers/tether.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.id)
  user_id: string;

  @OneToOne(() => Tether, (tether) => tether.tether_id)
  tether_id: string;

  @Column({ nullable: false })
  links_total: number;

  @Column({ nullable: false })
  links_completed: number;
}
