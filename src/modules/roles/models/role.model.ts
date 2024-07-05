import { plainToInstance } from 'class-transformer';
import { BaseModel } from '../../crud/models/base.model';
import { UserRole } from '../entities/user-role.entity';

export class UserRoleModel extends BaseModel<UserRole> {
  toEntity(): UserRole {
    return plainToInstance(UserRole, this);
  }
}
