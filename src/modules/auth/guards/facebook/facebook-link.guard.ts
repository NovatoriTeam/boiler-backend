import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookLinkGuard extends AuthGuard('facebook-link') {}
