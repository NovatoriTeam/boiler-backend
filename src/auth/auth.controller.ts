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
import { DeepPartial } from 'typeorm';
import { discordOAuth2Config, googleOAuth2Config } from '../config/config';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { DiscordOAuthGuard } from './guards/discord.guard';
import { GoogleOAuthGuard } from './guards/google.guard';
import { UsernamePasswordAuthGuard } from './guards/local.guard';
import { RequestInterface } from './interfaces/request.interface';

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
    @Req() req: RequestInterface<DeepPartial<User>>,
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
    @Req() req: RequestInterface<DeepPartial<User>>,
    @Res() res: Response,
  ): Promise<void> {
    return await this.handleOAuthCallback(
      req,
      res,
      discordOAuth2Config.redirectUrl,
    );
  }

  async handleOAuthCallback(
    req: RequestInterface<DeepPartial<User>>,
    res: Response,
    redirectUrl: string,
  ): Promise<void> {
    const { accessToken, refreshToken } =
      await this.authService.handleOAuthLogin(req.user);

    const cookieExpirationDate: Date = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ); // 1 year in milliseconds

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: cookieExpirationDate,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: cookieExpirationDate,
    });

    res.redirect(redirectUrl);
  }
}
