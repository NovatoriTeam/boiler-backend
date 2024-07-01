import {
  Brackets,
  DeleteQueryBuilder,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from 'typeorm';
import { QueryBuilderType } from '../types/enums/query-builder.type';
import { FilterType } from '../types/filter.type';
import { SearchType } from '../types/search.type';
import { SortType } from '../types/sort.type';

export class TypeormQueryBuilderUtil {
  public static applyWhereConditions(
    query: QueryBuilderType,
    filter: FilterType,
    alias: string,
  ): void {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        (query as SelectQueryBuilder<never>).andWhere(
          `${this.conditionalyGenerateAlias(alias, key)} in (:value)`,
          { value: filter[key] },
        );
      } else {
        (query as SelectQueryBuilder<never>).andWhere(
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
  ): void {
    for (const key in sort) {
      (query as SelectQueryBuilder<never>).addOrderBy(
        this.conditionalyGenerateAlias(alias, key),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        sort[key].toUpperCase(),
      );
    }
  }

  public static applyJoins(
    query: QueryBuilderType,
    filteredRelations: string[],
    alias?: string,
  ): void {
    for (const item of filteredRelations) {
      (query as SelectQueryBuilder<never>).leftJoinAndSelect(
        this.conditionalyGenerateAlias(alias, item),
        item,
      );
    }
  }

  public static applyLikeSearchWhereCondition(
    query: QueryBuilderType,
    search: SearchType,
    alias?: string,
  ): void {
    query.andWhere(
      new Brackets((query) => {
        for (const key in search) {
          const lowerCaseValue: string = search[key].toLowerCase();
          query.orWhere(
            `Lower(${this.conditionalyGenerateAlias(alias, key)}) like :value`,
            {
              value: `%${lowerCaseValue}%`,
            },
          );
        }
      }),
    );
  }

  public static applyPagination(
    query: QueryBuilderType,
    pagination: { limit: number; offset: number },
  ): void {
    (query as SelectQueryBuilder<never>)
      .limit(pagination.limit)
      .offset(pagination.offset);
  }

  public static isQueryBuilder(query: QueryBuilderType): boolean {
    return (
      query instanceof SelectQueryBuilder ||
      query instanceof UpdateQueryBuilder ||
      query instanceof DeleteQueryBuilder
    );
  }

  private static conditionalyGenerateAlias(alias: string, key: string): string {
    return alias ? `${alias}.${key}` : key;
  }
}
