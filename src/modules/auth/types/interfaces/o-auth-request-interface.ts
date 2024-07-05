import { DeepPartial } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { OAuthsEnum } from '../enums/o-auths.enum';

export interface OAuthRequestInterface {
  user: {
    data: DeepPartial<User>;
    type: OAuthsEnum;
    oauthId: string;
  };
}
