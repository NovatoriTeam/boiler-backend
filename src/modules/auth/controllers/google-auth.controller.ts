import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { googleOAuth2Config } from '../../../config/config';
import { Public } from '../decorators/public.decorator';
import { GoogleOauthLinkGuard } from '../guards/google/google-link.guard';
import { GoogleOAuthGuard } from '../guards/google/google.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get()
  async googleAuth(): Promise<void> {}

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('callback')
  async googleAuthCallBack(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(
      req,
      res,
      googleOAuth2Config.redirectUrl,
    );
  }

  @UseGuards(GoogleOauthLinkGuard)
  @Public()
  @Get('link')
  async googleAuthLink(): Promise<void> {}

  @UseGuards(GoogleOauthLinkGuard)
  @Public()
  @Get('callback/link')
  async googleAuthLinkCallBack(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(
      req,
      res,
      googleOAuth2Config.redirectUrl,
    );
  }
}
