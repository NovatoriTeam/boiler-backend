import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'novatori/validators';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
