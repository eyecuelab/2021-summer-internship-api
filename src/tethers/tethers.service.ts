import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTetherDto } from './dto/createTether.dto';
import { Repository } from 'typeorm';
import { Tether } from './tether.entity';
import { User } from '../users/user.entity';
import { UpdateTetherDto } from './dto/updateTether.dto';

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

  async getAllTethers(): Promise<Tether[]> {
    const user = await this.tethersRepository
      .createQueryBuilder('users')
      .getMany();
    return user;
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

  async updateOne(id: string, userData: Partial<UpdateTetherDto>) {
    const { affected } = await this.tethersRepository.update(id, userData);
    if (affected === 0) {
      return new NotFoundException('');
    }
    const tether = await this.find(id);
    return tether;
  }

  async deleteTether(id: string): Promise<void> {
    const result = await this.tethersRepository.delete({ id });

    if (result.affected === 0) {
      // Possibly redact this info to prevent unauthorized guessing
      throw new NotFoundException(`Tether with ID ${id} not found.`);
    }
  }
}
