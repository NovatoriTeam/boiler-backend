import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { QueryParametersDto } from '../dtos/query-parameters.dto';
import { QueryOptionsInterface } from '../interfaces/query-options.interface';
import { QueryProcessor } from '../processors/query.processor';

@Injectable()
export class FilterInterceptor implements NestInterceptor {
  constructor(
    private options: QueryOptionsInterface,
    private alias: string,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: { query: QueryParametersDto } = context
      .switchToHttp()
      .getRequest();
    const queryParameters: QueryParametersDto = plainToInstance(
      QueryParametersDto,
      request.query,
    );

    const helper: QueryProcessor = new QueryProcessor(
      queryParameters,
      this.options,
      this.alias,
    );
    request['queryHelper'] = helper;
    return next.handle().pipe(
      map((data) => {
        return this.transformData(data);
      }),
    );
  }

  private transformData(data: any): any {
    const obj: { status: number } = { status: 200 };
    if (Array.isArray(data)) {
      Object.assign(obj, {
        data: instanceToPlain(data) ?? data,
        count: data[1],
      });
    } else {
      Object.assign(obj, {
        data: instanceToPlain(data) ?? data,
      });
    }
    return obj;
  }
}
