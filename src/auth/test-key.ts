import { SetMetadata } from '@nestjs/common';

export const DISABLE_TO_DOMAIN = 'DISABLE_TO_DOMAIN';
export const DisableToDomain = () => {
  return SetMetadata(DISABLE_TO_DOMAIN, true);
}

export const skipValidationFunctions = [];
