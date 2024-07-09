import { UserModel } from 'novatori/validators';

export interface OAuthRequestInterface {
  user: {
    data: UserModel;
    link: boolean;
  };
}
