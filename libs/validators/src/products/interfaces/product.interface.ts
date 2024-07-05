import { UserModel } from '../../../../../src/modules/users/models/user.model';

export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  shop: string;
  user: UserModel;
}
