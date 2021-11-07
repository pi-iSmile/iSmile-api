import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';

class Server {
    private app: express.Application;

    constructor() {
      this.app = express();
      this.configuration();
      createConnection({
        name: 'default',
        type: 'postgres',
        url: process.env.TYPEORM_URL,
        synchronize: true,
        logging: true,
        entities: ['src/entity/**'],
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      });
      // this.routes();
    }

    public configuration() {
      this.app.set('port', process.env.PORT || 3000);
    }

    // public routes() {
    //   this.app.use('/api', appRoutes)
    //     .get('/', (request, response) => response.json({ hello: 'World' }));
    // }

    public start() {
      this.app.listen(this.app.get('port'), () => {
        console.log('Express server listening');
      });
    }
}

const server = new Server();
server.start();
