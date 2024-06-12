import { FilterableTypeEnum } from '../enums/filterable-type.enum';
import { QueryOptionsEnum } from '../enums/query-options.enum';

export interface QueryOptionsInterface {
  [key: string]: (QueryOptionsEnum | FilterableTypeEnum)[];
}
