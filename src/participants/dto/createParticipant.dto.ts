import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  links_total: number;
}
