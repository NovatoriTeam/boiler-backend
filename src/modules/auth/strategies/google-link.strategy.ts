import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthModel, AuthTypeEnum, UserModel } from 'novatori/validators';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { googleOAuth2Config } from '../../../config/config';
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
    accessToken: string,
    _refreshToken: string,
    profile: GoogleOauthUserInterface,
    done: VerifyCallback,
  ): Promise<void> {
    const { emails, name } = profile;

    const user = new UserModel();
    user.firstName = name.givenName;
    user.lastName = name.familyName;

    const auth = new AuthModel();
    auth.type = AuthTypeEnum.Google;
    auth.identifier = profile.id;
    auth.metadata = { email: emails[0].value, accessToken };

    user.auths = [auth];

    done(null, { data: user, link: true });
  }
}
