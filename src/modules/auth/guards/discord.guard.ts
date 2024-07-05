import { AuthGuard } from '@nestjs/passport';

export class DiscordOAuthGuard extends AuthGuard('discord') {}
