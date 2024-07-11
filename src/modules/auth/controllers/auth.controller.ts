import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  AuthResponseDto,
  PhoneDto,
  UserModel,
  VerifyOtpDto,
} from 'novatori/validators';
import { Public } from '../decorators/public.decorator';
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
  async login(
    @Req() req: RequestInterface<UserModel>,
  ): Promise<AuthResponseDto> {
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

  @Public()
  @Post('otp')
  async sendOTP(@Body() phoneDto: PhoneDto): Promise<void> {
    return await this.authService.sendOTP(phoneDto);
  }

  @Public()
  @Post('verify-otp')
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.verifyOtp(
      verifyOtpDto.phone,
      verifyOtpDto.otp,
    );
  }
}
