import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Tether } from 'src/tethers/tether.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne(() => Tether, (tether) => tether.tether_id)
  @Column({ nullable: false })
  tether_id: string;

  // @OneToOne(() => User, (user) => user.id)
  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  links_total: number;

  @Column({ nullable: false })
  links_completed: number;
}
