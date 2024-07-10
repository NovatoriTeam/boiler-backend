import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { discordOAuth2Config } from '../../../config/config';
import { Public } from '../decorators/public.decorator';
import { DiscordLinkGuard } from '../guards/discord/discord-link.guard';
import { DiscordOAuthGuard } from '../guards/discord/discord.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';

@Controller('auth/discord')
export class DiscordAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(DiscordOAuthGuard)
  @Public()
  @Get()
  async discordAuth(): Promise<void> {}

  @UseGuards(DiscordOAuthGuard)
  @Public()
  @Get('callback')
  async discordAuthCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(
      req,
      res,
      discordOAuth2Config.redirectUrl,
    );
  }

  @UseGuards(DiscordLinkGuard)
  @Public()
  @Get('link')
  async discordAuthLink(): Promise<void> {}

  @UseGuards(DiscordLinkGuard)
  @Public()
  @Get('callback/link')
  async discordAuthLinkCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(
      req,
      res,
      discordOAuth2Config.redirectUrl,
    );
  }
}
