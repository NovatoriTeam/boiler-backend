import { QueryParametersDto } from '../dtos/query-parameters.dto';
import { FilterableTypeEnum } from '../enums/filterable-type.enum';
import { QueryBuilderType } from '../enums/query-builder.type';
import { QueryOptionsInterface } from '../interfaces/query-options.interface';
import { FilterType } from '../types/filter.type';
import { SearchType } from '../types/search.type';
import { SortType } from '../types/sort.type';
import { TypeormFindUtil } from '../utils/typeorm-find.util';
import { TypeormQueryBuilderUtil } from '../utils/typeorm-query-builder.util';

export class QueryProcessor {
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

  public toQuery(query: QueryBuilderType): void {
    const { sort, filter, limit, offset, relation, search } =
      this.queryParameters;

    if (sort) this.applySortQuery(query, sort);
    if (filter) this.applyFilterQuery(query, filter);
    if (relation) this.applyRelationQuery(query, relation);
    if (search) this.applySearchQuery(query, search);
    if ((limit || offset) && !search)
      this.applyPaginationQuery(query, { limit, offset });
  }

  private applySortQuery(query: QueryBuilderType, sort: SortType): void {
    this.filterSortOptions(sort);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.addOrderBy(query, sort, this.alias);
    } else {
      TypeormFindUtil.addOrderBy(query, sort);
    }
  }

  private applyFilterQuery(query: QueryBuilderType, filter: FilterType): void {
    this.filterFilterOptions(filter);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.applyWhereConditions(query, filter, this.alias);
    } else {
      TypeormFindUtil.applyWhereConditions(query, filter);
    }
  }

  private filterSortOptions(sort: SortType): void {
    for (const key in sort) {
      if (!this.options[key]?.sortable) delete sort[key];
    }
  }

  private filterFilterOptions(filter: FilterType): void {
    for (const key in filter) {
      if (!this.options[key].filterable) {
        delete filter[key];
        continue;
      }
      const arrayOfFilters: string[] = (filter[key] as string).split?.(',');
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

  private filterRelationOptions(relation: string): string[] {
    const relationFields: string[] = relation?.split(',');
    for (let i: number = 0; i < relationFields.length; i++) {
      if (!this.options[relationFields[i]]?.relatable)
        relationFields.splice(i, 1);
    }
    return relationFields;
  }

  private filterSearchOptions(search: SearchType): void {
    for (const key in search) {
      if (!this.options[key]?.searchable) delete search[key];
    }
  }

  private applyPaginationQuery(
    query: QueryBuilderType,
    pagination?: { offset: number; limit: number },
  ): void {
    if (pagination) {
      if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
        TypeormQueryBuilderUtil.applyPagination(query, pagination);
      } else {
        TypeormFindUtil.applyPagination(query, pagination);
      }
    }
  }

  private applyRelationQuery(query: QueryBuilderType, relation: string): void {
    const filteredRelations: string[] = this.filterRelationOptions(relation);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.applyJoins(query, filteredRelations, this.alias);
    } else {
      TypeormFindUtil.applyJoins(query, relation);
    }
  }

  private applySearchQuery(query: QueryBuilderType, search: SearchType): void {
    this.filterSearchOptions(search);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.applyLikeSearchWhereCondition(
        query,
        search,
        this.alias,
      );
    } else {
      TypeormFindUtil.applyLikeSearchWhereCondition(query, search);
    }
  }
}
