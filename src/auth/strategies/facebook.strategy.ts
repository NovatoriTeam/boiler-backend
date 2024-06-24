import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { DeepPartial } from 'typeorm';
import { facebookOAuth2Config } from '../../config/config';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: facebookOAuth2Config.clientId,
      clientSecret: facebookOAuth2Config.clientSecret,
      callbackURL: facebookOAuth2Config.callbackUrl,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<DeepPartial<User>> {
    const { name, emails } = profile;
    const user: DeepPartial<User> = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };

    return user;
  }
}
