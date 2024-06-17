import { IsEmail, IsString, Validate } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password: string;

  @IsString()
  @Validate(
    (data: RegisterUserDto) => {
      return data.password === data.confirmPassword;
    },
    { message: 'password do not match' },
  )
  confirmPassword: string;
}
