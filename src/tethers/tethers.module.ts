import { Module } from '@nestjs/common';
import { TethersService } from './tethers.service';
import { Tether } from './tether.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TethersController } from './tethers.controller';
import { User } from 'src/users/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tether]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TethersController, UsersController],
  providers: [TethersService, UsersService],
  exports: [TethersService, UsersService],
})
export class TethersModule {}
