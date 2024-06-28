import { BaseModel } from '../../../../modules/crud/models/base.model';
import { TestEntity } from '../models/test.model';

export class TestModel extends BaseModel<TestEntity> {
  toEntity(): TestEntity {
    return undefined;
  }
}
