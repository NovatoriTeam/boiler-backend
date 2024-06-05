import { instanceToInstance } from 'class-transformer';
import { Product } from '../entities/product.entity';

const product = instanceToInstance(Product);

export const productRolesMap = {
  user: [],
  admin: ['id', 'name', 'createdAt'],
};
