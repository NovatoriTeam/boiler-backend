import { IsDecimal, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  budget: number;

  @IsString()
  status: string;
}
