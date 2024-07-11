import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { GithubLinkGuard } from '../guards/github/github-link.guard';
import { GithubGuard } from '../guards/github/github.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';

@Controller('auth/github')
export class GithubAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GithubGuard)
  @Public()
  @Get()
  async githubAuth(): Promise<void> {}

  @UseGuards(GithubGuard)
  @Public()
  @Get('callback')
  async githubAuthCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }

  @UseGuards(GithubLinkGuard)
  @Public()
  @Get('link')
  async githubAuthLink(): Promise<void> {}

  @UseGuards(GithubLinkGuard)
  @Public()
  @Get('callback/link')
  async githubAuthLinkCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.handleOAuthCallback(req, res);
  }
}
