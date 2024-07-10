import { Injectable } from '@nestjs/common';
import { VerifyCallback } from 'passport-google-oauth2';
import { GoogleOauthUserInterface } from '../types/interfaces/google-oauth-user.interface';
import { GoogleStrategy } from './google.strategy';

@Injectable()
export class GoogleLinkStrategy extends GoogleStrategy {
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: GoogleOauthUserInterface,
    done: VerifyCallback,
  ): Promise<void> {
    const user = this.performUserValidation(profile, accessToken);

    done(null, { data: user, link: true });
  }
}
