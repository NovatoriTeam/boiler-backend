import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthTypeEnum } from 'novatori/validators';
import { Profile, Strategy } from 'passport-github';
import { githubOAuth2Config } from '../../../../config/config';
import { OAuthUserInterface } from '../../types/interfaces/o-auth-user.interface';
import { serializeOAuthUser } from '../../utils/serialize-o-auth-user';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github-link') {
  constructor() {
    super({
      clientID: githubOAuth2Config.clientId,
      clientSecret: githubOAuth2Config.clientSecret,
      callbackURL: `${githubOAuth2Config.callbackUrl}/link`,
      scope: ['user'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<OAuthUserInterface> {
    const { username, id } = profile;
    const user = serializeOAuthUser({
      firstName: username,
      identifier: id,
      type: AuthTypeEnum.Github,
      metadata: { accessToken },
    });

    return { data: user, link: true };
  }
}
