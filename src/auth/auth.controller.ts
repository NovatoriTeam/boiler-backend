import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { jwtConfig } from '../config/config';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
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
}
