import express from 'express';

import 'dotenv/config';
import { errors } from 'celebrate';
import { Logger } from 'tslog';

import AppError from '../shared/AppError';
import '../shared/infra/typeorm/index';
import routes from '../shared/infra/http/routes/index';

const log: Logger = new Logger();

const app = express();
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err, req, res, next) => {
  log.error(err);
  if (err instanceof AppError) {
    res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Oops! Unknown error happened' });
});

app.listen(process.env.PORT || 3000, () => {
  log.info('🚀 Server started on port 3333');
});
