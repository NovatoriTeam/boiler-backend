import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { QueryHelper } from '../utils/query-helper';
import { QueryOptionsInterface } from '../interfaces/query-options.interface';
import { plainToInstance } from 'class-transformer';
import { QueryParametersDto } from '../dtos/query-parameters.dto';

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
    const request = context.switchToHttp().getRequest();
    const queryParameters = plainToInstance(QueryParametersDto, request.query);


    const helper = new QueryHelper(queryParameters, this.options, this.alias);
    request['queryHelper'] = helper;
    return next.handle();
  }
}
