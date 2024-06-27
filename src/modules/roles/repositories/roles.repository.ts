import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(UserRole) private rolesRepository: Repository<UserRole>,
  ) {}

  async create(data: DeepPartial<UserRole>): Promise<UserRole> {
    const newRole: UserRole = this.rolesRepository.create(data);
    return await this.rolesRepository.save(newRole);
  }

  async remove(id: number): Promise<UserRole> {
    return await this.rolesRepository.softRemove({ id: id });
  }
}
