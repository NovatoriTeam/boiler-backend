export interface DatabaseConfigInterface {
  readonly host: string;
  readonly username: string;
  readonly password: string;
  readonly port: number;
  readonly database: string;
  readonly schema: string;
  readonly migrationsRun: boolean;
}
