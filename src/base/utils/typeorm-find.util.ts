import { QueryBuilderType } from '../enums/query-builder.type';
import { SortType } from '../types/sort.type';
import { FilterType } from '../types/filter.type';
import { In, Like } from 'typeorm';
import { SearchType } from '../types/search.type';

export class TypeormFindUtil {
  public static addOrderBy(query: QueryBuilderType, sort: SortType) {
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
  ) {
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
  ) {
    Object.assign(query, {
      limit: pagination.limit,
      take: pagination.offset,
    });
  }

  public static applyJoins(query: QueryBuilderType, relation: string) {
    Object.assign(query, {
      relations: query.relations
        ? [...query.relation, ...relation]
        : [relation],
    });
  }

  public static applyLikeSearchWhereCondition(query: QueryBuilderType, search: SearchType) {
    for (const key in search) {
      Object.assign(query, {
        ...query.where,
        [key]: Like(`%${search[key]}%`),
      });
    }
  }

  private static transformToInConditionsIfNecessary(filter: FilterType) {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        filter[key] = In(filter[key] as string[]);
      }
    }
  }
}
