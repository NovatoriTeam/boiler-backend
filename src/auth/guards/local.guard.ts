import { AuthGuard } from '@nestjs/passport';

export class UsernamePasswordAuthGuard extends AuthGuard('local') {}
