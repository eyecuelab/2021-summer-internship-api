import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTetherDto } from './dto/createTether.dto';
import { MoreThan, Repository } from 'typeorm';
import { Tether } from './tether.entity';
import { User } from '../users/user.entity';
import { UpdateTetherDto } from './dto/updateTether.dto';
import { ParticipantsService } from 'src/participants/participants.service';

@Injectable()
export class TethersService {
  constructor(
    @InjectRepository(Tether)
    private tethersRepository: Repository<Tether>,
    private readonly participantsService: ParticipantsService,
  ) {}

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

    await this.tethersRepository.insert(newTether);

    await this.participantsService.create({
      tether_id: newTether.tether_id,
      user_id: newTether.tether_created_by,
      links_total: newTether.tether_timespan,
    });

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

  async completeTether(tether_id: string): Promise<Tether> {
    const canCompleteTether =
      await this.participantsService.getCanCompleteTether(tether_id);
    if (!canCompleteTether) {
      throw new UnauthorizedException(
        'All participants must have completed all links',
      );
    }
    const tetherToUpdate = await this.tethersRepository.findOne(tether_id);
    tetherToUpdate.tether_completed_on = new Date();

    await this.tethersRepository.save(tetherToUpdate);
    return tetherToUpdate;
  }

  async fullTether(tether_id: string): Promise<Tether> {
    const tetherToUpdate = await this.tethersRepository.findOne(tether_id);
    tetherToUpdate.tether_full_on = new Date();

    await this.tethersRepository.save(tetherToUpdate);
    return tetherToUpdate;
  }

  async findComplete(created_by: string): Promise<Tether[] | undefined> {
    const hasDate = await this.tethersRepository.find({
      tether_completed_on: MoreThan('1980-01-01 00:00:01.000000'),
      tether_created_by: created_by,
    });
    return hasDate;
  }

  async getRecent(): Promise<Tether[]> {
    const yesterday = new Date(Date.now() - 86400000);
    const query = await this.tethersRepository.find({
      tether_completed_on: MoreThan(yesterday),
    });
    return query;
  }
}
