import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { jwtConfig } from '../config/config';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LocalGuard } from './guards/local.guard';
import { Public } from './guards/public.key';

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

  @UseGuards(LocalGuard)
  @Public()
  @Post('login')
  async login(@Req() req: { user: User }): Promise<AuthResponseDto> {
    const { user } = req;

    return {
      accessToken: this.authService.generateJwtToken(user.id),
      refreshToken: this.authService.generateJwtToken(
        user.id,
        jwtConfig.refreshJwtSecret,
        '60d',
      ),
    };
  }
}
