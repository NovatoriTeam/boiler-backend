import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;
}
