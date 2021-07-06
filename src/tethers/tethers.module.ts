import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tether } from './tether.entity';
import { TethersController } from './tethers.controller';
import { TethersService } from './tethers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tether])],
  controllers: [TethersController],
  providers: [TethersService],
  exports: [TethersService],
})
export class TethersModule {}
