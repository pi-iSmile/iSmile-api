import { createConnection } from 'typeorm';
import 'dotenv/config';

createConnection({
  name: 'default',
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  synchronize: true,
  logging: true,
  entities: ['src/entity/**'],
  migrations: ['src/shared/infra/typeorm/migration/*.ts'],
  migrationsRun: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
