import { HttpException, Injectable } from '@nestjs/common';
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

  // Get all participation links where User is active participant
  async getOneUsersParticipatingTethers(
    user_id: string,
  ): Promise<Participant[]> {
    return this.participantsRepository.find({
      where: {
        user_id: `${user_id}`,
      },
    });
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

    // Need to prevent dupes from being added
    const existingLink = await this.checkExistingLink(
      participantData.tether_id,
      participantData.user_id,
    );

    const countParticipants = await this.getOneTethersParticipants(
      participantData.tether_id,
    );

    if (existingLink[0]?.id) {
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'User already exists on this Tether',
      //   },
      //   HttpStatus.FORBIDDEN,
      // );
    } else if (countParticipants.length >= 4) {
      // throw new HttpException(
      //   {
      //     status: HttpStatus.FORBIDDEN,
      //     error: 'Max amount of Users on this Tether',
      //   },
      //   HttpStatus.FORBIDDEN,
      // );
    } else {
      await this.participantsRepository.save(newParticipantLink);
      return newParticipantLink;
    }
  }
}
