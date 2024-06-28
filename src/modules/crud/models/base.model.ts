export abstract class BaseModel<T> {
  id!: number;

  abstract toEntity(): T;
}
