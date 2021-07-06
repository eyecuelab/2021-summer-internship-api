import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TethersModule } from 'src/tethers/tethers.module';
import { ParticipantsModule } from 'src/participants/participants.module';

@Module({
  imports: [
    // TethersModule,
    // ParticipantsModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
