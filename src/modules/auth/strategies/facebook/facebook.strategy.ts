import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Profile, Strategy } from 'passport-facebook';
import { facebookOAuth2Config } from '../../../../config/config';
import { OAuthUserInterface } from '../../types/interfaces/o-auth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

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
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<OAuthUserInterface> {
    const { name, emails, id } = profile;

    const user = serializeOAuthUser({
      firstName: name.givenName,
      lastName: name.familyName,
      identifier: id,
      type: AuthTypeEnum.Facebook,
      metadata: { email: emails[0].value, accessToken },
    });

    return { data: user, link: false };
  }
}
