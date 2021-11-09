import { createConnection } from 'typeorm';
import 'dotenv/config';

createConnection(
  {
    name: 'default',
    type: 'postgres',
    url: process.env.TYPEORM_URL,
    synchronize: true,
    logging: true,
    migrations: ['src/shared/infra/typeorm/migration/*.ts'],
    entities: ['{src, dist}/**/*.entity{.ts,.js}'],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
);
