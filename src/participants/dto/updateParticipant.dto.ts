import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateParticipantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  links_completed: number;
}
