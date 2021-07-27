import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateParticipantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
