import { IsNumberString } from 'class-validator';

export class PhoneDto {
  @IsNumberString()
  phone!: string;
}
