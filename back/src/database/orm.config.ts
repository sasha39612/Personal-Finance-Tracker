import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Config } from 'src/config/config.service';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
import * as process from 'node:process';

export const getOrmConfig = (env: Config): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    migrationsRun: process.env.MODE_ENV !== 'TEST',
    autoLoadEntities: true,
    migrations: [resolve(__dirname, './migrations/*{.ts,.js}')],
    entities: [resolve(__dirname, './entities/*{.ts,.js}')],
    // logging: ['error]
    logging: true,
  };
};

const dataSource = new DataSource({
  ...(getOrmConfig(process.env as any) as PostgresConnectionOptions),
});

dataSource.initialize().catch((err) => console.log(err));

export default dataSource;
