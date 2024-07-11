import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SteamLinkGuard extends AuthGuard('steam-link') {}
