import { IsNumberString } from 'class-validator';

export class VerifyOtpDto {
  @IsNumberString()
  phone!: string;

  @IsNumberString()
  otp!: string;
}
