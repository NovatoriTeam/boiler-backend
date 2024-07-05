import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { baseEntityChecker } from '../../../shared/helpers/baseEntityChecker/base-entity.checker';
import { ResponseInterface } from '../types/interfaces/response.interface';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface> {
    return next.handle().pipe(
      map((data) => {
        return this.transformData(data);
      }),
    );
  }

  private transformData(result: unknown): ResponseInterface {
    baseEntityChecker(result?.[0] ?? result);

    const data: unknown = result[0] ?? result;
    const count: number = result?.[1];

    return {
      status: 200,
      data,
      count: count,
    };
  }
}
