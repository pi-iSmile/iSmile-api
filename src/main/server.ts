import express from 'express';
import 'dotenv/config';
import '../shared/infra/typeorm';

class Server {
    private app: express.Application;

    constructor() {
      this.app = express();
      this.configuration();
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
