import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { CompilerConfigInterface } from './interfaces/compiler-config.interface';
import { DatabaseConfigInterface } from './interfaces/database-config.interface';
import { JwtConfigInterface } from './interfaces/jwt-config.interface';

dotenv.config();

export const databaseConfig: DatabaseConfigInterface = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
