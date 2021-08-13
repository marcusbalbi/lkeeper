import { createConnection } from 'typeorm';

const connectionConfig: any = {
  type: 'mysql',
  host: 'database_mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lkeeper_test',
  entities: ['src/models/*.ts'],
  migrations: ['migration/*.ts'],
};

(async () => {
  const connection = await createConnection({ ...connectionConfig, logging: true });

  await connection.runMigrations({
    transaction: 'none',
  });
  await connection.close();
})();
