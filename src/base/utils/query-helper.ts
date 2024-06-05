import { QueryBuilderType } from '../enums/query-builder.type';
import { In, Like } from 'typeorm';
import { TypeormQueryBuilderHelper } from './typeorm-query-builder.helper';
import { QueryOptionsInterface } from '../interfaces/query-options.interface';
import { QueryParametersDto } from '../dtos/query-parameters.dto';
import { SortType } from '../types/sort.type';
import { FilterType } from '../types/filter.type';
import { FilterableTypeEnum } from '../enums/filterable-type.enum';
import { SearchType } from '../types/search.type';

export class QueryHelper {
  private readonly queryParameters: QueryParametersDto;
  private readonly options: QueryOptionsInterface;
  private readonly alias?: string;

  constructor(
    queryParameters: QueryParametersDto,
    options: QueryOptionsInterface,
    alias: string,
  ) {
    this.queryParameters = queryParameters;
    this.options = options;
    this.alias = alias;
  }

  public toQuery(query: QueryBuilderType) {
    const { sort, filter, limit, offset, relation, search } =
      this.queryParameters;
    if (sort) this.applySortQuery(query, sort);
    if (filter) this.applyFilterQuery(query, filter);
    if (relation) this.applyRelationQuery(query, relation);
    if (search) this.applySearchQuery(query, search);
    if ((limit || offset) && !search)
      this.applyPaginationQuery(query, { limit, offset });
  }

  private applySortQuery(query: QueryBuilderType, sort: SortType) {
    this.filterSortOptions(sort);
    if (TypeormQueryBuilderHelper.isQueryBuilder(query)) {
      TypeormQueryBuilderHelper.addOrderBy(query, sort, this.alias);
    } else {
      Object.assign(query, {
        order: {
          ...query.order,
          ...sort,
        },
      });
    }
  }

  private applyFilterQuery(query: QueryBuilderType, filter: FilterType) {
    this.filterFilterOptions(filter);
    if (TypeormQueryBuilderHelper.isQueryBuilder(query)) {
      TypeormQueryBuilderHelper.applyWhereConditions(query, filter, this.alias);
    } else {
      this.transformToInConditionsIfNecessary(filter);
      Object.assign(query, {
        where: {
          ...query.where,
          ...filter,
        },
      });
    }
  }

  private filterSortOptions(sort: SortType) {
    const objectKeys = Object.keys(sort);
    const lastKey = objectKeys[objectKeys.length - 1];
    for (const key in sort) {
      if (!this.options[key]?.sortable && key !== lastKey) {
        delete sort[key];
      }
    }
  }

  private filterFilterOptions(filter: FilterType) {
    for (const key in filter) {
      if (!this.options[key].filterable) {
        delete filter[key];
        continue;
      }
      const arrayOfFilters = (filter[key] as string).split?.(',');
      if (
        arrayOfFilters.length > 1 &&
        this.options[key].filterable.type !== FilterableTypeEnum.Exists
      ) {
        delete filter[key];
      } else if (
        this.options[key].filterable.type !== FilterableTypeEnum.Exact &&
        arrayOfFilters.length < 2
      ) {
        delete filter[key];
      }

      if (arrayOfFilters.length > 1 && filter[key]) {
        filter[key] = (filter[key] as string)?.split(',');
      }
    }
  }

  private filterRelationOptions(relation: string) {
    const relationFields = relation?.split(',');
    for (let i = 0; i < relationFields.length; i++) {
      if (!this.options[relationFields[i]]?.relatable)
        relationFields.splice(i, 1);
    }
    return relationFields;
  }

  private filterSearchOptions(search: SearchType) {
    console.log(search);
    for (const key in search) {
      if (!this.options[key]?.searchable) delete search[key];
    }
  }

  private transformToInConditionsIfNecessary(filter: FilterType) {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        filter[key] = In(filter[key] as string[]);
      }
    }
  }

  private applyPaginationQuery(
    query: QueryBuilderType,
    pagination?: { offset: number; limit: number },
  ) {
    if (pagination) {
      if (TypeormQueryBuilderHelper.isQueryBuilder(query)) {
        TypeormQueryBuilderHelper.applyPagination(query, pagination);
      } else {
        Object.assign(query, {
          limit: pagination.limit,
          take: pagination.offset,
        });
      }
    }
  }

  private applyRelationQuery(query: QueryBuilderType, relation: string) {
    const filteredRelations = this.filterRelationOptions(relation);
    if (TypeormQueryBuilderHelper.isQueryBuilder(query)) {
      TypeormQueryBuilderHelper.applyJoins(
        query,
        filteredRelations,
        this.alias,
      );
    } else {
      Object.assign(query, {
        relations: query.relations
          ? [...query.relation, ...relation]
          : [relation],
      });
    }
  }

  private applySearchQuery(query: QueryBuilderType, search: SearchType) {
    this.filterSearchOptions(search);
    if (TypeormQueryBuilderHelper.isQueryBuilder(query)) {
      TypeormQueryBuilderHelper.applyLikeSearchWhereCondition(
        query,
        search,
        this.alias,
      );
    } else {
      for (const key in search) {
        Object.assign(query, {
          ...query.where,
          [key]: Like(`%${search[key]}%`),
        });
      }
    }
  }
}
