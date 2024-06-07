/* eslint-disable @typescript-eslint/no-explicit-any */

import { FindOperator } from 'typeorm';

export type FilterType = {
  [key: string]: string | string[] | FindOperator<any>;
};
