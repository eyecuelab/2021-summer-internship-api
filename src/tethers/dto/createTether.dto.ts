import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { TetherDuration } from '../tether-duration.enum';

export class CreateTetherDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_action: string;

  @ApiProperty()
  @IsNumber()
  tether_quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_noun: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TetherDuration)
  tether_duration: TetherDuration;
}
