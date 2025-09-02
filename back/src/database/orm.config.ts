import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
import * as process from 'node:process';

export const getOrmConfig = (env: any): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  autoLoadEntities: true,
  synchronize: env.MODE_ENV === 'TEST',
  migrationsRun: env.MODE_ENV !== 'TEST',
  migrations: [resolve(__dirname, './migrations/*{.ts,.js}')],
  logging: false,
});

const env = process.env;
const dataSource = new DataSource(getOrmConfig(env) as PostgresConnectionOptions);

dataSource.initialize().catch((err) => console.log(err));

export default dataSource;
