import { Expose } from 'class-transformer';

export abstract class BaseModel {
  @Expose()
  id!: number;
}
