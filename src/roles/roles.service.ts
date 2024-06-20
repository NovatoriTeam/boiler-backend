import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { RolesRepository } from './repositories/roles.repository';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async create(data: DeepPartial<UserRole>): Promise<UserRole> {
    return await this.rolesRepository.create(data);
  }

  async remove(id: number): Promise<UserRole> {
    return await this.rolesRepository.remove(id);
  }
}
