import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { AllowedOriginsConfigInterface } from './interfaces/allowed-origins-config.interface';
import { CompilerConfigInterface } from './interfaces/compiler-config.interface';
import { DatabaseConfigInterface } from './interfaces/database-config.interface';
import { JwtConfigInterface } from './interfaces/jwt-config.interface';
import { OAuthConfigInterface } from './interfaces/oauth-config.interface';

dotenv.config();

export const databaseConfig: DatabaseConfigInterface = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: process.env.MIGRATIONS_RUN === 'true',
};

export const jwtConfig: JwtConfigInterface = {
  jwtSecret: process.env.JWT_USER_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  refreshJwtSecret: process.env.REFRESH_USER_SECRET,
  refreshJwtExpiration: process.env.REFRESH_JWT_EXPIRATION,
};

export const compilerConfig: CompilerConfigInterface = {
  url: process.env.COMPILER_API_URL,
  apiKey: process.env.COMPILER_API_KEY,
  apiHost: process.env.COMPILER_API_HOST,
};

export const googleOAuth2Config: OAuthConfigInterface = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  redirectUrl: process.env.REDIRECT_URL,
};

export const discordOAuth2Config: OAuthConfigInterface = {
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackUrl: process.env.DISCORD_CALLBACK_URL,
  redirectUrl: process.env.REDIRECT_URL,
};

export const allowedOriginsConfig: AllowedOriginsConfigInterface = {
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split?.(',') ?? [],
};
