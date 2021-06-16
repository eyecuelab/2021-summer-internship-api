import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { TetherDuration } from '../tether-duration.enum';

export class CreateTetherDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUrl()
  // readonly pictureURL: string;

  // ---
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  completed_on?: Date;

  @ApiProperty()
  @IsDate()
  full_on?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  noun: string;

  @IsEnum(TetherDuration)
  duration: TetherDuration;
  // ---

  // @ApiProperty()
  // @IsNotEmpty()
  // readonly date: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // readonly tether: string;
}
