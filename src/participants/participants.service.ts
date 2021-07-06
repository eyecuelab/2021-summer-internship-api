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
      .getMany();
    return participants;
  }

  // Get all Tether's participants
  async getOneTethersParticipants(tether_id: string): Promise<Participant[]> {
    return this.participantsRepository.find({
      where: {
        tether_id: tether_id,
      },
    });
  }

  // Get all User's participating Tethers

  async create(participantData: CreateParticipantDto): Promise<Participant> {
    const newParticipantLink = await this.participantsRepository.create({
      ...participantData,
      // Next item will need to be also brought automatically later
      // Based on the duration/timespan ratio
      links_total: 10,
      // Always start at 0 links completed
      links_completed: 0,
    });
    await this.participantsRepository.save(newParticipantLink);
    return newParticipantLink;
  }
}
