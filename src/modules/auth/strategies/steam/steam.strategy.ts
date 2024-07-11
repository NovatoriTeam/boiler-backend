import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Strategy } from 'passport-steam';
import { steamOAuth2Config } from '../../../../config/config';
import { OAuthUserInterface } from '../../types/interfaces/o-auth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor() {
    super({
      returnURL: steamOAuth2Config.returnUrl,
      realm: steamOAuth2Config.realm,
      apiKey: steamOAuth2Config.apiKey,
    });
  }

  async validate(
    _identifier: string,
    profile: { displayName: string; id: string },
  ): Promise<OAuthUserInterface> {
    const user = serializeOAuthUser({
      firstName: profile.displayName,
      identifier: profile.id,
      type: AuthTypeEnum.Steam,
      metadata: {},
    });

    return { data: user, link: false };
  }
}
