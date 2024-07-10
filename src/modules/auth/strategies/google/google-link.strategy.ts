import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { googleOAuth2Config } from '../../../../config/config';
import { GoogleOauthUserInterface } from '../../types/interfaces/google-oauth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

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
      metadata: { emails: emails[0].value, accessToken },
    });

    done(null, { data: user, link: true });
  }
}
