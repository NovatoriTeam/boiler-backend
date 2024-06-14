import { QueryParametersDto } from '../dtos/query-parameters.dto';
import { FilterableTypeEnum } from '../enums/filterable-type.enum';
import { QueryBuilderType } from '../enums/query-builder.type';
import { QueryOptionsEnum } from '../enums/query-options.enum';
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
    const { sort, filter, limit, offset, relations, search } =
      this.queryParameters;

    if (sort) this.applySortQuery(query, sort);
    if (filter) this.applyFilterQuery(query, filter);
    if (relations) this.applyRelationQuery(query, relations);
    if (search) this.applySearchQuery(query, search);
    if ((limit || offset) && !search)
      this.applyPaginationQuery(query, { limit, offset });
  }

  private applySortQuery(query: QueryBuilderType, sort: SortType): void {
    this.validateSortOptions(sort);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.addOrderBy(query, sort, this.alias);
    } else {
      TypeormFindUtil.addOrderBy(query, sort);
    }
  }

  private applyFilterQuery(query: QueryBuilderType, filter: FilterType): void {
    this.validateFilterOptions(filter);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.applyWhereConditions(query, filter, this.alias);
    } else {
      TypeormFindUtil.applyWhereConditions(query, filter);
    }
  }

  private validateSortOptions(sort: SortType): void {
    for (const key in sort) {
      const isFieldSortable: boolean = this.options[key]?.includes(
        QueryOptionsEnum.Sortable,
      );
      if (!isFieldSortable) delete sort[key];
    }
  }

  private validateFilterOptions(filter: FilterType): void {
    for (const key in filter) {
      const filterValue: string = filter[key] as string;
      const arrayOfFilters: string[] = filterValue?.split(',') || [];
      const hasPermissionForExactFiltering: boolean = this.options[
        key
      ].includes(FilterableTypeEnum.Exact);
      const hasPermissionForExistsFiltering: boolean = this.options[
        key
      ].includes(FilterableTypeEnum.Exists);
      const hasMultipleFilters: boolean = arrayOfFilters.length > 1;

      if (!hasPermissionForExactFiltering && !hasPermissionForExistsFiltering) {
        delete filter[key];
        continue;
      }
      if (hasMultipleFilters && !hasPermissionForExistsFiltering) {
        delete filter[key];
      } else if (hasPermissionForExactFiltering && hasMultipleFilters) {
        delete filter[key];
      }

      if (hasMultipleFilters && filter[key]) {
        filter[key] = (filter[key] as string)?.split(',');
      }
    }
  }

  private validateRelationOptions(relations: string[]): string[] {
    for (let i: number = 0; i < relations.length; i++) {
      const isFieldRelatable: boolean = this.options[relations[i]]?.includes(
        QueryOptionsEnum.Relatable,
      );
      if (!isFieldRelatable) relations.splice(i, 1);
    }
    return relations;
  }

  private filterSearchOptions(search: SearchType): void {
    for (const key in search) {
      const isFieldSearchable: boolean = this.options[key]?.includes(
        QueryOptionsEnum.Searchable,
      );
      if (!isFieldSearchable) delete search[key];
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

  private applyRelationQuery(
    query: QueryBuilderType,
    relations: string[],
  ): void {
    const filteredRelations: string[] = this.validateRelationOptions(relations);
    if (TypeormQueryBuilderUtil.isQueryBuilder(query)) {
      TypeormQueryBuilderUtil.applyJoins(query, filteredRelations, this.alias);
    } else {
      TypeormFindUtil.applyJoins(query, relations);
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
