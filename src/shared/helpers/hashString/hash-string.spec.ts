import { hashString } from './hashString';

describe('hashString', () => {
  test('should return a consistent hash for the same input', () => {
    const input = 'hello world';
    const hash1: string = hashString(input);
    const hash2: string = hashString(input);
    expect(hash1).toBe(hash2);
  });

  test('should return different hashes for different inputs', () => {
    const input1 = 'hello world';
    const input2 = 'goodbye world';
    const hash1: string = hashString(input1);
    const hash2: string = hashString(input2);
    expect(hash1).not.toBe(hash2);
  });

  test('should return a hash of the correct length', () => {
    const input = 'hello world';
    const hash: string = hashString(input);
    expect(hash).toHaveLength(64); // SHA-256 produces a 64-character hex string
  });
});
