import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  corsConfig,
  discordOAuth2Config,
  googleOAuth2Config,
} from '../../../config/config';
import { User } from '../../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { DiscordOAuthGuard } from '../guards/discord.guard';
import { GoogleOAuthGuard } from '../guards/google.guard';
import { UsernamePasswordAuthGuard } from '../guards/local.guard';
import { RefreshGuard } from '../guards/refresh.guard';
import { AuthService } from '../services/auth.service';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request.interface';
import { RequestInterface } from '../types/interfaces/request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.register(registerUserDto);
  }

  @UseGuards(UsernamePasswordAuthGuard)
  @Public()
  @Post('login')
  async login(@Req() req: RequestInterface<User>): Promise<AuthResponseDto> {
    return await this.authService.login(req.user);
  }

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('google')
  async googleAuth(): Promise<void> {}

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('google/callback')
  async googleAuthCallBack(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.handleOAuthCallback(
      req,
      res,
      googleOAuth2Config.redirectUrl,
    );
  }

  @UseGuards(DiscordOAuthGuard)
  @Public()
  @Get('discord')
  async discordAuth(): Promise<void> {}

  @UseGuards(DiscordOAuthGuard)
  @Public()
  @Get('discord/callback')
  async discordAuthCallback(
    @Req() req: OAuthRequestInterface,
    @Res() res: Response,
  ): Promise<void> {
    return await this.handleOAuthCallback(
      req,
      res,
      discordOAuth2Config.redirectUrl,
    );
  }

  @UseGuards(RefreshGuard)
  @Public()
  @Get('refresh')
  async refreshTokens(
    @Req() req: { user: { id: number }; refreshToken: string },
  ): Promise<AuthResponseDto> {
    return await this.authService.refreshToken(req.user.id, req.refreshToken);
  }

  async handleOAuthCallback(
    req: OAuthRequestInterface,
    res: Response,
    redirectUrl: string,
  ): Promise<void> {
    const user = await this.authService.handleOAuthLogin(req);

    if (!req.user.isLinkingAccount) {
      const { refreshToken, accessToken } = user as AuthResponseDto;
      this.setTokenCookiesToResponse({ res, refreshToken, accessToken });
    }

    res.redirect(redirectUrl);
  }

  private setTokenCookiesToResponse(data: {
    res: Response;
    accessToken: string;
    refreshToken: string;
  }): void {
    const { res, accessToken, refreshToken } = data;
    const cookieExpirationDate: Date = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ); // 1 year in milliseconds

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: cookieExpirationDate,
      domain: corsConfig.baseDomain,
      secure: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: cookieExpirationDate,
      secure: true,
      domain: corsConfig.baseDomain,
    });
  }
}
