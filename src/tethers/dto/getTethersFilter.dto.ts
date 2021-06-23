import { IsString, IsOptional } from 'class-validator';

export class GetTethersFilterDto {
  @IsOptional()
  @IsString()
  created_by?: string;
}
