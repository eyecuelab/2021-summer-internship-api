import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/createParticipant.dto';
import { Participant } from './participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  async getParticipants(): Promise<Participant[]> {
    const participants = await this.participantsRepository
      .createQueryBuilder('participants')
      .leftJoinAndSelect('participants.user_id', 'users')
      .leftJoinAndSelect('participants.tether_id', 'tethers')
      .getMany();
    return participants;
  }

  async getFullParticipantDetails(tether_id: string) {
    const query = await this.participantsRepository
      .createQueryBuilder('participants')
      .leftJoinAndSelect('participants.tether_id', 'tethers')
      .leftJoinAndSelect('participants.user_id', 'users')
      .where('participants.tether_id = :tether_id', { tether_id: tether_id })
      .getMany();

    return query;
  }

  async getParticipantUserDetails(user_id: string) {
    const query = await this.participantsRepository
      .createQueryBuilder('participants')
      .leftJoinAndSelect('participants.tether_id', 'tethers')
      .where('participants.user_id = :user_id', { user_id: user_id })
      .andWhere('tethers.tether_completed_on is null')
      .getMany();

    return query;
  }

  async getParticipantTetherDetails(tether_id: string) {
    const query = await this.participantsRepository
      .createQueryBuilder('participants')
      .leftJoinAndSelect('participants.user_id', 'users')
      .where('participants.tether_id = :tether_id', { tether_id: tether_id })
      .getMany();

    return query;
  }

  async create(participantData: CreateParticipantDto): Promise<Participant> {
    const newParticipantLink = await this.participantsRepository.create({
      ...participantData,
      links_completed: 0,
    });

    await this.participantsRepository.save(newParticipantLink);
    return newParticipantLink;
  }

  async addIncrement(id: string): Promise<Participant> {
    const thisParticipantLink = await this.participantsRepository.findOne({
      where: {
        id: id,
      },
    });

    if (thisParticipantLink.links_completed < thisParticipantLink.links_total) {
      thisParticipantLink.links_completed =
        thisParticipantLink.links_completed + 1;
      await this.participantsRepository.save(thisParticipantLink);
    }

    return thisParticipantLink;
  }
}
