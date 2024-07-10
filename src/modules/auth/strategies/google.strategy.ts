import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { AuthTypeEnum } from '../../../boiler-shared/src/validators/auth/enums/auth-type.enum';
import { AuthModel } from '../../../boiler-shared/src/validators/auth/models/auth.model';
import { UserModel } from '../../../boiler-shared/src/validators/user/user.model';
import { googleOAuth2Config } from '../../../config/config';
import { GoogleOauthUserInterface } from '../types/interfaces/google-oauth-user.interface';

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

  protected performUserValidation(
    profile: GoogleOauthUserInterface,
    accessToken: string,
  ): UserModel {
    const { emails, name } = profile;

    const user = new UserModel();
    user.firstName = name.givenName;
    user.lastName = name.familyName;

    const auth = new AuthModel();
    auth.type = AuthTypeEnum.Google;
    auth.identifier = profile.id;
    auth.metadata = { email: emails[0].value, accessToken };

    user.auths = [auth];

    return user;
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: GoogleOauthUserInterface,
    done: VerifyCallback,
  ): Promise<void> {
    const user = this.performUserValidation(profile, accessToken);
    done(null, { data: user, link: false });
  }
}
