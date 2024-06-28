import { BaseEntity } from '../../../../modules/crud/entities/base.entity';
import { TestModel } from '../entities/test.entity';

export class TestEntity extends BaseEntity<TestModel> {
  id: number;
  name: string;

  toModel(): TestModel {
    return undefined;
  }
}
