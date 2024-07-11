import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { CompilerConfigInterface } from './interfaces/compiler-config.interface';
import { CorsConfigInterface } from './interfaces/cors-config.interface';
import { DatabaseConfigInterface } from './interfaces/database-config.interface';
import { JwtConfigInterface } from './interfaces/jwt-config.interface';
import { OAuthConfigInterface } from './interfaces/oauth-config.interface';
import { RedirectConfigInterface } from './interfaces/redirect-config.interface';
import { SteamOAuthConfig } from './interfaces/steam-oauth-config.interface';

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

export const facebookOAuth2Config: OAuthConfigInterface = {
  clientId: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackUrl: process.env.FACEBOOK_CALLBACK_URL,
  redirectUrl: process.env.REDIRECT_URL,
};

export const discordOAuth2Config: OAuthConfigInterface = {
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackUrl: process.env.DISCORD_CALLBACK_URL,
  redirectUrl: process.env.REDIRECT_URL,
};

export const corsConfig: CorsConfigInterface = {
  allowedUrls: process.env.ALLOWED_ORIGIN_URLS?.split?.(',') ?? [],
  baseDomain: process.env.BASE_DOMAIN,
};

export const redirectConfig: RedirectConfigInterface = {
  homePageUrl: process.env.HOME_PAGE_URL ?? '',
  accountLinkingPageUrl: process.env.ACCOUNT_LINKING_PAGE_URL ?? '',
};

export const githubOAuth2Config: OAuthConfigInterface = {
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: process.env.GITHUB_CALLBACK_URL,
  redirectUrl: process.env.REDIRECT_URL,
};

export const bnetOAuth2Config: OAuthConfigInterface = {
  clientId: process.env.BNET_CLIENT_ID,
  clientSecret: process.env.BNET_CLIENT_SECRET,
  callbackUrl: process.env.BNET_CALLBACK_URL,
  redirectUrl: process.env.REDIRECT_URL,
};

export const steamOAuth2Config: SteamOAuthConfig = {
  returnUrl: process.env.STEAM_CALLBACK_URL,
  realm: process.env.STEAM_REALM,
  apiKey: process.env.STEAM_API_KEY,
};
