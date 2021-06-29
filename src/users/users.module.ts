import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tether } from 'src/tethers/tether.entity';
import { TethersController } from 'src/tethers/tethers.controller';
import { TethersService } from 'src/tethers/tethers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tether]),
  ],
  controllers: [UsersController, TethersController],
  providers: [UsersService, TethersService],
  exports: [UsersService, TethersService],
})
export class UsersModule {}
