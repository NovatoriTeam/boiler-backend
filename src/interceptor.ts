import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

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
        console.log(data);
        return {
          status: 200,
          data: data[0],
          count: data[1],
        };
      }),
    );
  }
}
