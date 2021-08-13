import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'database_mysql',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'lkeeper',
  entities: ['src/models/*.ts'],
};

const configTest: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'database_mysql',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'lkeeper',
  entities: ['src/models/*.ts'],
};

export { config, configTest };

export default config;
