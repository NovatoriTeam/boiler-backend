import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get getJwtSecret() {
    const string = this.configService.get('JWT_USER_SECRET');

    return string;
  }
}
