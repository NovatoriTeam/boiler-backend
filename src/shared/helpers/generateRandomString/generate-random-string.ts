import * as crypto from 'node:crypto';

export const generateRandomString = (size = 64): string => {
  return crypto.randomBytes(size).toString('hex');
};
