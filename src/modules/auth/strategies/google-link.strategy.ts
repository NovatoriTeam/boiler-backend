import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { DeepPartial } from 'typeorm';
import { googleOAuth2Config } from '../../../config/config';
import { User } from '../../users/entities/user.entity';
import { AuthTypeEnum } from '../types/enums/auth-type.enum';
import { GoogleOauthUserInterface } from '../types/interfaces/google-oauth-user.interface';

@Injectable()
export class GoogleLinkStrategy extends PassportStrategy(
  Strategy,
  'google-link',
) {
  constructor() {
    super({
      clientID: googleOAuth2Config.clientId,
      clientSecret: googleOAuth2Config.clientSecret,
      callbackURL: `${googleOAuth2Config.callbackUrl}/link`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleOauthUserInterface,
    done: VerifyCallback,
  ): Promise<void> {
    const { emails, name } = profile;
    const user: DeepPartial<User> = {
      firstName: name.givenName,
      lastName: name.familyName,
      auths: [
        {
          type: AuthTypeEnum.Google,
          identifier: profile.id,
          metadata: { email: emails[0].value },
        },
      ],
    };

    done(null, { data: user, link: true });
  }
}
