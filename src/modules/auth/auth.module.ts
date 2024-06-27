import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { AuthController } from './controllers/auth.controller';
import { Refresh } from './entities/refresh.entity';
import { AuthGuard } from './guards/auth.guard';
import { AuthRepository } from './repositories/auth.repository';
import { AuthService } from './services/auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Refresh]), JwtModule.register({})],
  providers: [
    AuthService,
    UsersRepository,
    AuthRepository,
    LocalStrategy,
    GoogleStrategy,
    DiscordStrategy,
    { provide: 'APP_GUARD', useClass: AuthGuard },
  ],
})
export class AuthModule {}
