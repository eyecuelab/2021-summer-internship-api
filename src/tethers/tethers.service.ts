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

  async find(tether_id: string) {
    return this.tethersRepository.find({
      where: {
        tether_id: tether_id,
      },
    });
  }

  async getAllTethers(): Promise<Tether[]> {
    const tethers = await this.tethersRepository
      .createQueryBuilder('tethers')
      .getMany();
    return tethers;
  }

  async create(tetherData: CreateTetherDto, user: User): Promise<Tether> {
    const newTether = await this.tethersRepository.create({
      ...tetherData,
      tether_name: `${tetherData.tether_activity} - ${tetherData.tether_duration} ${tetherData.tether_duration_noun} a ${tetherData.tether_frequency}, ${tetherData.tether_timespan} times.`,
      tether_created_by: user.id,
      tether_created_by_plain: user.username,
    });

    await this.tethersRepository.save(newTether);

    return newTether;
  }

  async updateOne(tether_id: string, tetherData: Partial<UpdateTetherDto>) {
    const { affected } = await this.tethersRepository.update(
      tether_id,
      tetherData,
    );
    if (affected === 0) {
      return new NotFoundException('');
    }

    const tetherToUpdate = await this.tethersRepository.findOne(tether_id);
    tetherToUpdate.tether_name = `${tetherData.tether_activity} - ${tetherData.tether_duration} ${tetherData.tether_duration_noun} a ${tetherData.tether_frequency}, ${tetherData.tether_timespan} times.`;
    await this.tethersRepository.save(tetherToUpdate);
    return tetherToUpdate;
  }

  async deleteTether(tether_id: string): Promise<void> {
    const result = await this.tethersRepository.delete({ tether_id });
    if (result.affected === 0) {
      // Possibly redact this info to prevent unauthorized guessing
      throw new NotFoundException(`Tether with ID ${tether_id} not found.`);
    }
  }
}
