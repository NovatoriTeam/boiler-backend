import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { SenderLog } from '../entities/sender-log.entity';

@Injectable()
export class SenderRepository {
  constructor(
    @InjectRepository(SenderLog)
    private senderLogsRepository: Repository<SenderLog>,
  ) {}

  async create(data: DeepPartial<SenderLog>): Promise<SenderLog> {
    const newSenderLog = this.senderLogsRepository.create(data);
    return await this.senderLogsRepository.save(newSenderLog);
  }

  async update(
    id: number,
    data: DeepPartial<SenderLog>,
  ): Promise<UpdateResult> {
    return await this.senderLogsRepository.update(id, data);
  }

  async getCount(): Promise<number> {
    return await this.senderLogsRepository.count();
  }
}
