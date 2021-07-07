import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/participants/participant.entity';
import { ParticipantsModule } from 'src/participants/participants.module';
import { Tether } from './tether.entity';
import { TethersController } from './tethers.controller';
import { TethersService } from './tethers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tether]),
    TypeOrmModule.forFeature([Participant]),
  ],
  controllers: [TethersController],
  providers: [TethersService],
  exports: [TethersService],
})
export class TethersModule {}
