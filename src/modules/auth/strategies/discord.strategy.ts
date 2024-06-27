import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { DeepPartial } from 'typeorm';
import { discordOAuth2Config } from '../../../config/config';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: discordOAuth2Config.clientId,
      clientSecret: discordOAuth2Config.clientSecret,
      callbackURL: discordOAuth2Config.callbackUrl,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<DeepPartial<User>> {
    const { email, username } = profile;
    const user: DeepPartial<User> = {
      firstName: username,
      email,
    };

    return user;
  }
}
