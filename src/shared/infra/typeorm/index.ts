import { Connection, createConnection } from 'typeorm';
import 'dotenv/config';

export default class DatabaseConnection {
  public static create(): Promise<Connection> {
    return createConnection(
      {
        name: 'default',
        type: 'postgres',
        url: process.env.TYPEORM_URL,
        synchronize: true,
        logging: true,
        migrations: ['src/shared/infra/typeorm/migration/*.ts'],
        migrationsRun: true,
        entities: [`${__dirname}./dist/entity/**/*.js`],
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
    );
  }
}
