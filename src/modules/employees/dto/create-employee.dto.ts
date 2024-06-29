import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsDateString()
  hireDate: Date;

  @IsString()
  jobTitle: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  departmentId: number;
}
