import { AuthParamsInterface } from './auth-params.interface';

export interface CreateAndRemoveParamsInterface extends AuthParamsInterface {
  newRefreshToken: string;
}
