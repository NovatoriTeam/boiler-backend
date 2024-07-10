import { UserModel } from 'novatori/validators';

export interface OAuthUserInterface {
  data: UserModel;
  link: boolean;
}
