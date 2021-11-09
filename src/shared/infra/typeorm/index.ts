import { createConnection } from 'typeorm';
import 'dotenv/config';

export default class DatabaseConnection {
  static async connection() {
    await createConnection({
      name: 'default',
      type: 'postgres',
      url: process.env.TYPEORM_URL,
      synchronize: true,
      logging: true,
      migrations: ['src/shared/infra/typeorm/migration/*.ts'],
      migrationsRun: true,
      entities: ['**/src/entity/*.ts'],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    });
  }
}
