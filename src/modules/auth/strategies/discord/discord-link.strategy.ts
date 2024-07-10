import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Profile, Strategy } from 'passport-discord';
import { discordOAuth2Config } from '../../../../config/config';
import { OAuthUserInterface } from '../../types/interfaces/o-auth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

export class DiscordLinkStrategy extends PassportStrategy(
  Strategy,
  'discord-link',
) {
  constructor() {
    super({
      clientID: discordOAuth2Config.clientId,
      clientSecret: discordOAuth2Config.clientSecret,
      callbackURL: `${discordOAuth2Config.callbackUrl}/link`,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<OAuthUserInterface> {
    const { username, email, id } = profile;

    const user = serializeOAuthUser({
      firstName: username,
      type: AuthTypeEnum.Discord,
      identifier: id,
      metadata: { email, accessToken },
    });

    return { data: user, link: true };
  }
}
