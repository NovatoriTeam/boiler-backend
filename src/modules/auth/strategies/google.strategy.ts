import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { DeepPartial } from 'typeorm';
import { googleOAuth2Config, jwtConfig } from '../../../config/config';
import { User } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/repositories/users.repository';
import { OAuthTypeEnum } from '../types/enums/o-auth-type.enum';
import { GoogleOauthUserInterface } from '../types/interfaces/google-oauth-user.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {
    super({
      clientID: googleOAuth2Config.clientId,
      clientSecret: googleOAuth2Config.clientSecret,
      callbackURL: googleOAuth2Config.callbackUrl,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: { cookies: { accessToken: string } },
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleOauthUserInterface,
    done: VerifyCallback,
  ): Promise<void> {
    const { emails, name } = profile;

    const user: DeepPartial<User> = new User();
    user.email = emails[0].value;
    user.firstName = name.givenName;
    user.lastName = name.familyName;
    user.oAuths = { ...user.oAuths, googleId: profile.id };

    const accessToken = req.cookies.accessToken;

    await this.extractUserIdFromToken(accessToken, user);

    const oAuthUser = await this.usersRepository.findByOAuthId(
      OAuthTypeEnum.Google,
      profile.id,
    );

    const isAccountAlreadyLinked = !!oAuthUser && oAuthUser.id !== user.id;

    done(null, {
      data: user,
      isLinkingAccount: !!user.id && !isAccountAlreadyLinked,
      oAuthId: profile.id,
      type: OAuthTypeEnum.Google,
    });
  }

  private async extractUserIdFromToken(
    accessToken: string,
    user: DeepPartial<User>,
  ): Promise<void> {
    try {
      const { id } = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConfig.jwtSecret,
      });

      user.id = id;
    } catch (err) {}
  }
}
