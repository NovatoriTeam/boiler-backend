import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApplyDecoratorType } from '../../../shared/types/apply-decorator.type';
import { FilterInterceptor } from '../interceptors/filter.interceptor';
import { QueryOptionsInterface } from '../types/interfaces/query-options.interface';

export function CrudFilter(
  options: QueryOptionsInterface,
  alias?: string,
): ApplyDecoratorType {
  return applyDecorators(
    UseInterceptors(new FilterInterceptor(options, alias ?? 'items')),
  );
}
