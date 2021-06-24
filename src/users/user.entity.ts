import { Tether } from '../tethers/tether.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Tether, (tether) => tether.tether_id)
  tethers: Tether[];

  @Column({ nullable: true })
  tethers_ongoing: number;

  @Column({ nullable: true })
  tethers_completed: number;

  // @OneToMany(() => Friend, (friend) => friend.id)
  // friends: Friend[];

  @CreateDateColumn()
  created_on?: Date;

  @CreateDateColumn()
  updated_on?: Date;

  @Column({ nullable: true })
  xp: number;

  // @OneToMany(() => Rating, (rating) => rating.user)
  // ratings: Rating[];
}
