import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTetherDto } from './dto/createTether.dto';
import { Repository } from 'typeorm';
import { Tether } from './tether.entity';
import { User } from '../users/user.entity';
import { UpdateTetherDto } from './dto/updateTether.dto';
import { GetTethersFilterDto } from './dto/getTethersFilter.dto';

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
      .createQueryBuilder('tethers')
      .getMany();
    return user;
  }

  async getAllTethersFiltered(
    filterDto: GetTethersFilterDto,
  ): Promise<Tether[]> {
    const { created_by } = filterDto;

    const query = this.tethersRepository.createQueryBuilder('tethers');

    if (created_by) {
      query.andWhere('(LOWER(tethers.created_by) LIKE LOWER(:created_by))', {
        created_by: `%${created_by}%`,
      });
      console.log(query);
    }

    try {
      const tethers = await query.getMany();
      return tethers;
    } catch (error) {
      throw new InternalServerErrorException();
    }
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
