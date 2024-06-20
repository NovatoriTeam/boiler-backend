import * as crypto from 'node:crypto';

export const hashString = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};
