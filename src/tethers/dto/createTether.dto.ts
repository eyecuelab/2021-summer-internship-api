import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { TetherDuration } from '../tether-duration.enum';

export class CreateTetherDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_activity: string;

  @ApiProperty()
  @IsNumber()
  tether_duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_duration_noun: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TetherDuration)
  tether_frequency: TetherDuration;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tether_timespan: number;
}
