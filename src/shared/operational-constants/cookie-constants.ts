import { CookieConstantsInterface } from './cooke-constants/types/interfaces/cookie-constants.interface';

export const cookieConstants: CookieConstantsInterface = {
  oneYearExpirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
};
