import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    return next.handle().pipe(
      map((data) => {
        return {
          status: 200,
          data: data ? instanceToPlain(data, { groups: [user?.role] }) : data,
        }
      }),
    );
  }
}
