import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tether } from 'src/tethers/tether.entity';
import { TethersController } from 'src/tethers/tethers.controller';
import { TethersModule } from 'src/tethers/tethers.module';
import { TethersService } from 'src/tethers/tethers.service';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Participant } from './participant.entity';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tether]),
    TypeOrmModule.forFeature([Participant]),
  ],
  controllers: [ParticipantsController, TethersController],
  providers: [ParticipantsService, TethersService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
