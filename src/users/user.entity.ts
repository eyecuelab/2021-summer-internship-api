import { Tether } from '../tethers/tether.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  BeforeInsert,
  JoinTable,
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

  @ManyToMany(() => Tether, (tether) => tether.user, {
    cascade: true,
  })
  @JoinTable()
  tethers: Tether[];

  @Column({ nullable: true })
  tethers_ongoing: number;

  @Column({ nullable: true })
  tethers_completed: number;

  @CreateDateColumn()
  created_on?: Date;

  @CreateDateColumn()
  updated_on?: Date;

  @Column({ nullable: true })
  xp: number;
}
