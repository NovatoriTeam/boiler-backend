import { IsDateString, IsDecimal, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsDecimal()
  budget: number;

  @IsString()
  status: string;
}
