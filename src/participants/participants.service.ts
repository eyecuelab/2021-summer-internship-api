import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  // Create a new Participant link
  async create(participantData: CreateParticipantDto): Promise<Participant> {
    const newParticipantLink = await this.participantsRepository.create({
      ...participantData,
      links_completed: 0,
      links_total: 10,
    });

    await this.participantsRepository.save(newParticipantLink);
    return newParticipantLink;

    // // Need to prevent dupes from being added
    // const existingLink = await this.checkExistingLink(
    //   participantData.tether_id,
    //   participantData.user_id,
    // );

    // // Prevent too many users
    // const countParticipants = await this.countParticipants(
    //   participantData.tether_id,
    // );

    // if (existingLink) {
    //   // This error handling is less than ideal
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'User already exists on this Tether',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    // if (countParticipants >= 4) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'Max amount of Users on this Tether',
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    // // Should only add IF the link doesn't exist AND there's fewer than 4 ppl total
    // if (!existingLink && countParticipants < 4) {
    //   await this.participantsRepository.save(newParticipantLink);
    //   return newParticipantLink;
    // }
  }
}
