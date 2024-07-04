import { DeepPartial } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { OAuthTypeEnum } from '../enums/o-auth-type.enum';

export interface OAuthRequestInterface {
  user: {
    data: DeepPartial<User>;
    isLinkingAccount: boolean;
    type: OAuthTypeEnum;
    oAuthId: string;
  };
}
