import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly pictureURL: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly rating: number;
}
