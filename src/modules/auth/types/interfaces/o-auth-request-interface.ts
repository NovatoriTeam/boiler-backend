import { DeepPartial } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

export interface OAuthRequestInterface {
  user: {
    data: DeepPartial<User>;
    link: boolean;
  };
}
