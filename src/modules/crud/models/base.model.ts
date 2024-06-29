import { Expose } from 'class-transformer';

export abstract class BaseModel<T> {
  @Expose()
  id!: number;

  abstract toEntity(): T;
}
