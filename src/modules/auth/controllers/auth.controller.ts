import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UsernamePasswordAuthGuard } from '../guards/local.guard';
import { RefreshGuard } from '../guards/refresh.guard';
import { AuthService } from '../services/auth.service';
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

  @UseGuards(RefreshGuard)
  @Public()
  @Get('refresh')
  async refreshTokens(
    @Req() req: { user: { id: number }; refreshToken: string },
  ): Promise<AuthResponseDto> {
    return await this.authService.refreshToken(req.user.id, req.refreshToken);
  }
}
