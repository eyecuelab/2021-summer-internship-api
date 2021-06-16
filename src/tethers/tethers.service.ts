import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTetherDto } from './dto/createTether.dto';
import { Repository } from 'typeorm';
import { Tether } from './tether.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TethersService {
  constructor(
    @InjectRepository(Tether)
    private tethersRepository: Repository<Tether>,
  ) {}

  async find(userId: string) {
    return this.tethersRepository.find({
      where: {
        user: userId,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Tether | undefined> {
    return this.tethersRepository.findOne({
      where: {
        id: id,
        user: userId,
      },
    });
  }

  async create(tetherData: CreateTetherDto, user: Omit<User, 'password'>) {
    const newTether = await this.tethersRepository.create({
      ...tetherData,
      user,
    });
    await this.tethersRepository.save(newTether);
    return newTether;
  }
}

// , user: Omit<User, 'password'>
