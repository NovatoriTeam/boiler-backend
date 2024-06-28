import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsOptional } from 'class-validator';
import { FilterType } from '../types/filter.type';
import { SearchType } from '../types/search.type';
import { SortType } from '../types/sort.type';
import { ToArray } from '../utils/to-array';

export class QueryParametersDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset!: number;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => ToArray(value))
  relations!: string[];

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
