import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { FilterType } from '../types/filter.type';
import { SearchType } from '../types/search.type';
import { SortType } from '../types/sort.type';

export class QueryParametersDto {
  @IsOptional()
  @IsNumber()
  limit!: number;

  @IsOptional()
  @IsNumber()
  offset!: number;

  @IsOptional()
  @IsString()
  relation!: string;

  @IsOptional()
  @IsObject()
  sort!: SortType;

  @IsOptional()
  @IsObject()
  filter!: FilterType;

  @IsOptional()
  @IsObject()
  search!: SearchType;
}
