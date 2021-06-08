import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from './rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsController } from './ratings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}
