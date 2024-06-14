import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ValidationError,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
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

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request: { query: QueryParametersDto } = context
      .switchToHttp()
      .getRequest();

    const queryParameters: QueryParametersDto = plainToInstance(
      QueryParametersDto,
      request.query,
    );
    const validationErrors: ValidationError[] = await validate(queryParameters);

    if (validationErrors.length) {
      throw new BadRequestException(
        this.generateErrorMessage(validationErrors),
      );
    }

    const helper: QueryProcessor = new QueryProcessor(
      queryParameters,
      this.options,
      this.alias,
    );
    request['queryHelper'] = helper;
    return next.handle();
  }

  private generateErrorMessage(errors: ValidationError[]): string {
    const errorMessage: string[] = errors.map((error) =>
      Object.values(error.constraints).join(),
    );
    return JSON.stringify(errorMessage);
  }
}
