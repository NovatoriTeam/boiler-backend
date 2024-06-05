import { FilterableTypeEnum } from '../enums/filterable-type.enum';

export class QueryOptionsInterface {
  [key: string]: {
    filterable?: {
      type: FilterableTypeEnum;
    };
    sortable?: boolean;
    searchable?: boolean;
    relatable?: boolean;
  };
}
