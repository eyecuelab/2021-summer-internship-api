import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { TetherCategory } from '../tether-category.enum';
import { TetherFrequency } from '../tether-frequency.enum';

export class UpdateTetherDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_name: string;

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
  @IsEnum(TetherFrequency)
  tether_frequency: TetherFrequency;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tether_timespan: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TetherCategory)
  tether_category: TetherCategory;
}
