import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from '../config/config';

export const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  ...databaseConfig,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource: DataSource = new DataSource(connectionOptions);
export default dataSource;
