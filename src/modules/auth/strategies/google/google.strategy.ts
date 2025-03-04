import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { googleOAuth2Config } from '../../../../config/config';
import { GoogleOauthUserInterface } from '../../types/interfaces/google-oauth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: googleOAuth2Config.clientId,
      clientSecret: googleOAuth2Config.clientSecret,
      callbackURL: googleOAuth2Config.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: GoogleOauthUserInterface,
    done: VerifyCallback,
  ): Promise<void> {
    const { emails, name, id } = profile;

    const user = serializeOAuthUser({
      firstName: name.givenName,
      lastName: name.familyName,
      identifier: id,
      type: AuthTypeEnum.Google,
      metadata: { email: emails[0].value, accessToken },
    });

    done(null, { data: user, link: false });
  }
}
