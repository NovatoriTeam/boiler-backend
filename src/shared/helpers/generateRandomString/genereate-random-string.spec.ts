import { generateRandomString } from './generate-random-string';

describe('generateRandomString', () => {
  test('should return a string of the correct length', () => {
    const size = 64;
    const randomString: string = generateRandomString(size);
    expect(randomString).toHaveLength(size * 2);
  });

  test('should return different strings on subsequent calls', () => {
    const size = 64;
    const randomString1: string = generateRandomString(size);
    const randomString2: string = generateRandomString(size);
    expect(randomString1).not.toBe(randomString2);
  });
});
