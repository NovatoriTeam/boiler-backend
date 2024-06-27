import { Module } from '@nestjs/common';
import { CompilerService } from './services/compiler.service';

@Module({
  providers: [CompilerService],
  exports: [CompilerService],
})
export class CompilerModule {}
