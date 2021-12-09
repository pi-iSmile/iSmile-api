import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import 'dotenv/config';
import { errors } from 'celebrate';
import { Logger } from 'tslog';
import cors from 'cors';
import helmet from 'helmet';

import 'express-async-errors';
import AppError from '../shared/AppError';
import '../shared/infra/typeorm/index';
import routes from '../shared/infra/http/routes/index';

const log: Logger = new Logger();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(helmet());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  log.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  log.info('🚀 Server started on port 3333');
});
