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
import { googleOAuth2Config, jwtConfig } from '../config/config';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { GoogleOAuthGuard } from './guards/google.guard';
import { UsernamePasswordAuthGuard } from './guards/local.guard';
import { Public } from './guards/public.key';
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
    const { user } = req;

    return {
      accessToken: this.authService.generateJwtToken({
        userId: user.id,
        secret: jwtConfig.jwtSecret,
        expiresIn: jwtConfig.jwtExpiration,
      }),
      refreshToken: this.authService.generateJwtToken({
        userId: user.id,
        secret: jwtConfig.refreshJwtSecret,
        expiresIn: jwtConfig.refreshJwtExpiration,
      }),
    };
  }

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async googleAuth() {}

  @UseGuards(GoogleOAuthGuard)
  @Public()
  @Get('google/callback')
  async googleAuthCallBack(
    @Req() req: RequestInterface<DeepPartial<User>>,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } =
      await this.authService.handleGoogleOAuthLogin(req.user);

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.redirect(googleOAuth2Config.redirectUrl);
  }
}
