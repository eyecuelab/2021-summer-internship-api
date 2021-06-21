import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { TetherDuration } from '../tether-duration.enum';

export class UpdateTetherDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUrl()
  // readonly pictureURL: string;

  // ---
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

  @ApiProperty()
  @IsNotEmpty()
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
