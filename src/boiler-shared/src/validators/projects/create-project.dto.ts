import { IsDecimal, IsEmail, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsEmail()
  description: string;

  @IsDecimal()
  budget: number;

  @IsString()
  status: string;
}
