import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { CookieEnum } from '../../auth/types/enums/cookie.enum';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ status: number }> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken: string | undefined = request[CookieEnum.AccessToken];

    return next.handle().pipe(
      map((data) => {
        return this.transformData(data, accessToken);
      }),
    );
  }

  private transformData(
    data: unknown,
    accessToken?: string,
  ): { status: number } {
    const response: { status: number; accessToken?: string } = {
      status: 200,
      accessToken,
    };
    if (Array.isArray(data)) {
      Object.assign(response, {
        data: instanceToPlain(data[0]) ?? data[0],
        count: data[1],
      });
    } else {
      Object.assign(response, {
        data: instanceToPlain(data) ?? data,
      });
    }
    return response;
  }
}
