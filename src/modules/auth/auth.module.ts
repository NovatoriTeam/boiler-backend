import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { AuthController } from './controllers/auth.controller';
import { GoogleAuthController } from './controllers/google-auth.controller';
import { Auth } from './entities/auth.entity';
import { Refresh } from './entities/refresh.entity';
import { AuthGuard } from './guards/auth.guard';
import { AuthRepository } from './repositories/auth.repository';
import { RefreshRepository } from './repositories/refresh.repository';
import { AuthService } from './services/auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleLinkStrategy } from './strategies/google-link.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController, GoogleAuthController],
  imports: [
    TypeOrmModule.forFeature([User, Refresh, Auth]),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    UsersRepository,
    RefreshRepository,
    GoogleLinkStrategy,
    AuthRepository,
    LocalStrategy,
    GoogleStrategy,
    DiscordStrategy,
    FacebookStrategy,
    { provide: 'APP_GUARD', useClass: AuthGuard },
  ],
})
export class AuthModule {}
