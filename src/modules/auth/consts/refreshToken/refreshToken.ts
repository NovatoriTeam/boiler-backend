import * as dayjs from 'dayjs';
import { RefreshTokenConstsInterface } from './interfaces/refresh-token.consts.interface';

export const refreshTokenConsts: RefreshTokenConstsInterface = {
  expiration: dayjs().add(14, 'day').toDate(),
};
