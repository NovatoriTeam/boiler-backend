import { UserModel } from '../../../../boiler-shared/src/validators/user/user.model';

export interface OAuthRequestInterface {
  user: {
    data: UserModel;
    link: boolean;
  };
}
