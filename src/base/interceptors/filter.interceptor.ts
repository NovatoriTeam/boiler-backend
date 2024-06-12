import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { QueryParametersDto } from '../dtos/query-parameters.dto';
import { QueryOptionsInterface } from '../interfaces/query-options.interface';
import { QueryProcessor } from '../processors/query.processor';

@Injectable()
export class FilterInterceptor implements NestInterceptor {
  constructor(
    private options: QueryOptionsInterface,
    private alias: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
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
    return next.handle();
  }
}
