import { FindOperator } from 'typeorm';

export type FilterType = {
  [key: string]: string | string[] | FindOperator<any>;
};
