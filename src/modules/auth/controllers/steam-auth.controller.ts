import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { SteamLinkGuard } from '../guards/steam/steam-link.guard';
import { SteamGuard } from '../guards/steam/steam.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';

@Controller('auth/steam')
export class SteamAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(SteamGuard)
  @Public()
  @Get()
  async steamAuth(): Promise<void> {}

  @UseGuards(SteamGuard)
  @Public()
  @Get('callback')
  async steamAuthCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }

  @UseGuards(SteamLinkGuard)
  @Public()
  @Get('link')
  async steamAuthLink(): Promise<void> {}

  @UseGuards(SteamLinkGuard)
  @Public()
  @Get('callback/link')
  async steamAuthCallbackLink(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }
}
