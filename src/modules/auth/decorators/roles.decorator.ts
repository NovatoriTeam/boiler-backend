import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../roles/types/enums/role.enum';

export const ROLES_KEY: string = 'roles';
export const Roles = (...roles: RoleEnum[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
