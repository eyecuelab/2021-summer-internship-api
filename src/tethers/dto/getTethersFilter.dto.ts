import { IsString, IsOptional } from 'class-validator';

export class GetTethersFilterDto {
  @IsOptional()
  @IsString()
  tether_created_by?: string;
}
