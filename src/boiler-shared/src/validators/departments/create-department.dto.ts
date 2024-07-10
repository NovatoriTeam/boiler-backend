import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name!: string;

  @IsString()
  manager!: string;

  @IsString()
  location!: string;
}
