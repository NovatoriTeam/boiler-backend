/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DeleteQueryBuilder,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'typeorm';

export type QueryBuilderType =
  | SelectQueryBuilder<any>
  | UpdateQueryBuilder<any>
  | DeleteQueryBuilder<any>
  | any;
