import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  xp: number;
}
