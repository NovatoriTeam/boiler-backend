import { BaseEntity } from '../../../modules/crud/entities/base.entity';

export function baseEntityChecker(data: unknown): void {
  function checkRecursive(item: unknown): void {
    if (item instanceof BaseEntity) {
      throw new Error('You are returning a base entity');
    }

    const isArray: boolean = Array.isArray(item);
    const isObject: boolean = typeof item === 'object';

    if (isArray) {
      for (const element of item as []) {
        checkRecursive(element);
      }
    } else if (isObject) {
      for (const key in item as NonNullable<unknown>) {
        if (item.hasOwnProperty(key)) {
          checkRecursive(item[key]);
        }
      }
    }
  }

  checkRecursive(data);
}
