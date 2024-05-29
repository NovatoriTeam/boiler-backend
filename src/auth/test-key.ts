import { SetMetadata } from '@nestjs/common';

export const DISABLE_TO_DOMAIN = 'DISABLE_TO_DOMAIN';
export const DisableToDomain = () => {
  console.log('heree in key');
  return SetMetadata(DISABLE_TO_DOMAIN, true);
}

export const skipValidationFunctions = [];
