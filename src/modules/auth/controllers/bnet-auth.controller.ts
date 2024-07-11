import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { BnetLinkGuard } from '../guards/bnet/bnet-link.guard';
import { BnetGuard } from '../guards/bnet/bnet.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';

@Controller('auth/bnet')
export class BnetAuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  @UseGuards(BnetGuard)
  async bnetAuth(): Promise<void> {}

  @Get('callback')
  @Public()
  @UseGuards(BnetGuard)
  async bnetAuthCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }

  @Get('link')
  @Public()
  @UseGuards(BnetLinkGuard)
  async bnetAuthLink(): Promise<void> {}

  @Get('callback/link')
  @Public()
  @UseGuards(BnetLinkGuard)
  async bnetAuthLinkCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }
}
