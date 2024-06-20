import * as crypto from 'node:crypto';

export const generateRandomString = (size: number = 64): string => {
  return crypto.randomBytes(size).toString('hex');
};
