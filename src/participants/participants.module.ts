import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ParticipantsModule {}
