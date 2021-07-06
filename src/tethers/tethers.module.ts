import { Module } from '@nestjs/common';
import { TethersService } from './tethers.service';
import { Tether } from './tether.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TethersController } from './tethers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tether])],
  controllers: [TethersController],
  providers: [TethersService],
  exports: [TethersService],
})
export class TethersModule {}
