import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/createParticipant.dto';
import { UpdateParticipantDto } from './dto/updateParticipant.dto';
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
      .getMany();
    return participants;
  }

  async find(participants_id: string): Promise<Participant[]> {
    return this.participantsRepository.find({
      where: {
        id: participants_id,
      },
    });
  }

  async countParticipants(tether_id: string): Promise<number> {
    const query = await this.participantsRepository
      .createQueryBuilder('participants')
      .where('participants.tether_id = :tether_id', { tether_id: tether_id })
      .getMany();

    return query.length;
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

  async getParticipantTetherDetails(tether_id: string) {
    const query = await this.participantsRepository
      .createQueryBuilder('participants')
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
      .getMany();

    return query;
  }

  async checkExistingLink(
    tether_id: string,
    user_id: string,
  ): Promise<Participant[] | undefined> {
    return this.participantsRepository.find({
      where: {
        tether_id: tether_id,
        user_id: user_id,
      },
    });
  }

  async create(participantData: CreateParticipantDto): Promise<Participant> {
    const newParticipantLink = await this.participantsRepository.create({
      ...participantData,
      links_completed: 0,
      links_total: 10,
    });

    await this.participantsRepository.save(newParticipantLink);
    return newParticipantLink;
  }

  // Add one increment
  // IN a perfect world, this will add or subtract
  async addIncrement(link_id): Promise<void> {
    const thisParticipantLink = await this.participantsRepository.findOne(
      link_id,
    );

    if (thisParticipantLink.links_completed < thisParticipantLink.links_total) {
      thisParticipantLink.links_completed =
        thisParticipantLink.links_completed + 1;
      await this.participantsRepository.save(thisParticipantLink);
    }
    console.log(thisParticipantLink);
  }
}
