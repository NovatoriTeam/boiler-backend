import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthGuard } from './guards/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    UsersRepository,
    LocalStrategy,
    JwtService,
  ],
})
export class AuthModule {}
