import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { FacebookLinkGuard } from '../guards/facebook/facebook-link.guard';
import { FacebookGuard } from '../guards/facebook/facebook.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';

@Controller('auth/facebook')
export class FacebookAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(FacebookGuard)
  @Public()
  @Get()
  async facebookAuth(): Promise<void> {}

  @UseGuards(FacebookGuard)
  @Public()
  @Get('callback')
  async facebookAuthCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }

  @UseGuards(FacebookLinkGuard)
  @Public()
  @Get('link')
  async facebookLinkAuth(): Promise<void> {}

  @UseGuards(FacebookLinkGuard)
  @Public()
  @Get('callback/link')
  async facebookAuthLinkCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }
}
