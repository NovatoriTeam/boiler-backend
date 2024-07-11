import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenderLog } from './entities/sender-log.entity';
import { SenderRepository } from './repositories/sender.repository';
import { SenderService } from './sender.service';

@Module({
  imports: [TypeOrmModule.forFeature([SenderLog])],
  providers: [SenderService, SenderRepository],
  exports: [SenderService],
})
export class SenderModule {}
