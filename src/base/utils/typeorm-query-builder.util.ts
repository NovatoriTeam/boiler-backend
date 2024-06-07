import { QueryBuilderType } from '../enums/query-builder.type';
import {
  Brackets,
  DeleteQueryBuilder,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'typeorm';
import { FilterType } from '../types/filter.type';
import { SortType } from '../types/sort.type';
import { SearchType } from '../types/search.type';

export class TypeormQueryBuilderUtil {
  public static applyWhereConditions(
    query: QueryBuilderType,
    filter: FilterType,
    alias: string,
  ) {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        (query as SelectQueryBuilder<any>).andWhere(
          `${this.conditionalyGenerateAlias(alias, key)} in (:value)`,
          { value: filter[key] },
        );
      } else {
        (query as SelectQueryBuilder<any>).andWhere(
          `${this.conditionalyGenerateAlias(alias, key)} = :value`,
          { value: filter[key] },
        );
      }
    }
  }

  public static addOrderBy(
    query: QueryBuilderType,
    sort: SortType,
    alias: string,
  ) {
    for (const key in sort) {
      (query as SelectQueryBuilder<any>).addOrderBy(
        this.conditionalyGenerateAlias(alias, key),
        // @ts-ignore
        sort[key].toUpperCase(),
      );
    }
  }

  public static applyJoins(
    query: QueryBuilderType,
    filteredRelations: string[],
    alias?: string,
  ) {
    for (const item of filteredRelations) {
      (query as SelectQueryBuilder<any>).leftJoinAndSelect(
        this.conditionalyGenerateAlias(alias, item),
        item,
      );
    }
  }

  public static applyLikeSearchWhereCondition(
    query: QueryBuilderType,
    search: SearchType,
    alias?: string,
  ) {
    query.andWhere(
      new Brackets((query) => {
        for (const key in search) {
          query.orWhere(
            `${this.conditionalyGenerateAlias(alias, key)} like :value`,
            {
              value: `%${search[key]}%`,
            },
          );
        }
      }),
    );
  }

  public static applyPagination(
    query: QueryBuilderType,
    pagination: { limit: number; offset: number },
  ) {
    (query as SelectQueryBuilder<any>)
      .limit(pagination.limit)
      .offset(pagination.offset);
  }

  public static isQueryBuilder(query: QueryBuilderType) {
    return (
      query instanceof SelectQueryBuilder ||
      query instanceof UpdateQueryBuilder ||
      query instanceof DeleteQueryBuilder
    );
  }

  private static conditionalyGenerateAlias(alias: string, key: string) {
    return alias ? `${alias}.${key}` : key;
  }
}
