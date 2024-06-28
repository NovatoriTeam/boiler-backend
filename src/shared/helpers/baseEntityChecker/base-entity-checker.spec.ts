import { baseEntityChecker } from './base-entity.checker';
import { TestEntity } from './models/test.model';

describe('baseEntityChecker', () => {
  it('should throw an error if BaseEntity is found in the data', () => {
    const data: unknown = new TestEntity();
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should throw an error if BaseEntity is found nested in the data', () => {
    const data: unknown = {
      nested: new TestEntity(),
    };
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should throw an error if BaseEntity is found in nested objects inside arrays', () => {
    const data: unknown = {
      nested: {
        id: 1,
        name: 'Test',
        test: [new TestEntity()],
      },
    };
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should throw an error if BaseEntity is found in arrays inside nested objects', () => {
    const data: unknown = {
      level1: {
        level2: {
          testArray: [
            {
              entity: new TestEntity(),
            },
          ],
        },
      },
    };
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should handle arrays containing BaseEntity instances', () => {
    const data: unknown = [new TestEntity()];
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should handle deeply nested structures', () => {
    const data: unknown = {
      level1: {
        level2: {
          level3: {
            entity: new TestEntity(),
          },
        },
      },
    };
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should not throw an error for plain objects and arrays', () => {
    const data: unknown = {
      level1: {
        level2: {
          level3: {
            entity: {
              id: 1,
              name: 'Test',
            },
          },
        },
      },
    };
    expect(() => baseEntityChecker(data)).not.toThrow();
  });

  it('should throw an error if BaseEntity is found in nested arrays and objects', () => {
    const data: unknown = [
      {
        level1: [
          {
            level2: new TestEntity(),
          },
        ],
      },
    ];
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should throw an error if BaseEntity is found in a complex nested structure', () => {
    const data: unknown = {
      level1: [
        {
          level2: {
            level3: [
              {
                level4: new TestEntity(),
              },
            ],
          },
        },
      ],
    };
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should not throw an error for deeply nested plain objects and arrays', () => {
    const data: unknown = {
      level1: [
        {
          level2: {
            level3: [
              {
                level4: {
                  id: 1,
                  name: 'Test',
                },
              },
            ],
          },
        },
      ],
    };
    expect(() => baseEntityChecker(data)).not.toThrow();
  });

  it('should throw an error if BaseEntity is found in mixed types within arrays', () => {
    const data: unknown = [
      1,
      'test',
      { id: 2, name: 'Test' },
      new TestEntity(),
    ];
    expect(() => baseEntityChecker(data)).toThrow(
      'You are returning a base entity',
    );
  });

  it('should not throw an error for mixed types within arrays if no BaseEntity is found', () => {
    const data: unknown = [
      1,
      'test',
      { id: 2, name: 'Test' },
      { id: 3, name: 'Test 2' },
    ];
    expect(() => baseEntityChecker(data)).not.toThrow();
  });
});
