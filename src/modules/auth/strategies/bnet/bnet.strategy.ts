import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Strategy } from 'passport-bnet';
import { bnetOAuth2Config } from '../../../../config/config';
import { OAuthUserInterface } from '../../types/interfaces/o-auth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

@Injectable()
export class BnetStrategy extends PassportStrategy(Strategy, 'bnet') {
  constructor() {
    super({
      clientID: bnetOAuth2Config.clientId,
      clientSecret: bnetOAuth2Config.clientSecret,
      callbackURL: bnetOAuth2Config.callbackUrl,
      scope: ['openid'],
    });
  }

  authorizationParams(): { state: string } {
    return {
      state: 'bnet',
    };
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: { id: string; battletag: string },
  ): Promise<OAuthUserInterface> {
    const { id, battletag } = profile;
    const [userName, tag] = battletag.split('#');

    const user = serializeOAuthUser({
      firstName: userName,
      identifier: id,
      type: AuthTypeEnum.Bnet,
      metadata: { accessToken, tag },
    });

    return { data: user, link: false };
  }
}
