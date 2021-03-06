import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsModule } from 'src/participants/participants.module';
import { Tether } from './tether.entity';
import { TethersController } from './tethers.controller';
import { TethersService } from './tethers.service';

@Module({
  imports: [ParticipantsModule, TypeOrmModule.forFeature([Tether])],
  controllers: [TethersController],
  providers: [TethersService],
  exports: [TethersService],
})
export class TethersModule {}
