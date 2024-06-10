import * as process from 'node:process';
import * as dotenv from 'dotenv';
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
};
