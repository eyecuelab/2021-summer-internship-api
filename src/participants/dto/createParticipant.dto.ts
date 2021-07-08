import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tether_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
