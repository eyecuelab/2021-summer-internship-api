import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRatingDto } from './dto/createRating.dto';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
  ) {}

  async find(userId: string) {
    return this.ratingsRepository.find({
      where: {
        user: userId,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Rating | undefined> {
    return this.ratingsRepository.findOne({
      where: {
        id: id,
        user: userId,
      },
    });
  }

  async create(ratingData: CreateRatingDto, user: Omit<User, 'password'>) {
    const newRating = await this.ratingsRepository.create({
      ...ratingData,
      user,
    });
    await this.ratingsRepository.save(newRating);
    return newRating;
  }
}
