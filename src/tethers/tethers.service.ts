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

  // Finds Tether by user ID
  async find(userId: string) {
    return this.tethersRepository.find({
      where: {
        tether_created_by: userId,
      },
    });
  }

  async getAllTethers(): Promise<Tether[]> {
    const tethers = await this.tethersRepository
      .createQueryBuilder('tethers')
      .getMany();
    return tethers;
  }

  // Works as get all tethers but allows for optional created_by parameter
  // where created_by is the plaintext UUID of the user who created this
  async getAllTethersFiltered(
    filterDto: GetTethersFilterDto,
  ): Promise<Tether[]> {
    const { tether_created_by } = filterDto;
    const query = this.tethersRepository.createQueryBuilder('tethers');
    if (tether_created_by) {
      query.andWhere(
        '(LOWER(tethers.tether_created_by) LIKE LOWER(:tether_created_by))',
        {
          tether_created_by: `%${tether_created_by}%`,
        },
      );
    }
    try {
      const tethers = await query.getMany();
      return tethers;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(
    tether_id: string,
    userId: string,
  ): Promise<Tether | undefined> {
    return this.tethersRepository.findOne({
      where: {
        tether_id: tether_id,
        tether_created_by: userId,
      },
    });
  }

  async create(tetherData: CreateTetherDto, user: Omit<User, 'password'>) {
    const newTether = await this.tethersRepository.create({
      ...tetherData,
      // user: [user],
      tether_name: `${tetherData.tether_activity} - ${tetherData.tether_duration} ${tetherData.tether_duration_noun} a ${tetherData.tether_frequency}, ${tetherData.tether_timespan} times.`,
      // tether_created_by: `${user}`,
      tether_created_by_plain: `${user.username}`,
    });
    await this.tethersRepository.save(newTether);
    return newTether;
  }

  async updateOne(
    tether_id: string,
    tether_userData: Partial<UpdateTetherDto>,
    // Note: updating does NOT change the title yet!
  ) {
    const { affected } = await this.tethersRepository.update(
      tether_id,
      tether_userData,
    );
    if (affected === 0) {
      return new NotFoundException('');
    }
    const tether = await this.find(tether_id);
    return tether;
  }

  async deleteTether(tether_id: string): Promise<void> {
    const result = await this.tethersRepository.delete({ tether_id });
    if (result.affected === 0) {
      // Possibly redact this info to prevent unauthorized guessing
      throw new NotFoundException(`Tether with ID ${tether_id} not found.`);
    }
  }
}
