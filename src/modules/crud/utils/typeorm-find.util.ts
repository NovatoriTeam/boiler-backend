import { In, Like } from 'typeorm';
import { QueryBuilderType } from '../types/enums/query-builder.type';
import { FilterType } from '../types/filter.type';
import { SearchType } from '../types/search.type';
import { SortType } from '../types/sort.type';

export class TypeormFindUtil {
  public static addOrderBy(query: QueryBuilderType, sort: SortType): void {
    Object.assign(query, {
      order: {
        ...query.order,
        ...sort,
      },
    });
  }

  public static applyWhereConditions(
    query: QueryBuilderType,
    filter: FilterType,
  ): void {
    this.transformToInConditionsIfNecessary(filter);
    Object.assign(query, {
      where: {
        ...query.where,
        ...filter,
      },
    });
  }

  public static applyPagination(
    query: QueryBuilderType,
    pagination: { limit: number; offset: number },
  ): void {
    Object.assign(query, {
      limit: pagination.limit,
      take: pagination.offset,
    });
  }

  public static applyJoins(query: QueryBuilderType, relations: string[]): void {
    Object.assign(query, {
      relations: query.relations
        ? [...query.relation, ...relations]
        : relations,
    });
  }

  public static applyLikeSearchWhereCondition(
    query: QueryBuilderType,
    search: SearchType,
  ): void {
    for (const key in search) {
      Object.assign(query, {
        ...query.where,
        [key]: Like(`%${search[key]}%`),
      });
    }
  }

  private static transformToInConditionsIfNecessary(filter: FilterType): void {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        filter[key] = In(filter[key] as string[]);
      }
    }
  }
}
