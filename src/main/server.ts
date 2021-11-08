import express from 'express';
import 'dotenv/config';
import '../shared/infra/typeorm';

import { errors } from 'celebrate';
import { Logger } from 'tslog';
import routes from '../shared/infra/http/routes/index';
import AppError from '../shared/AppError';

const log: Logger = new Logger();

const app = express();
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err, req, res, next) => {
  log.error(err);
  if (err instanceof AppError) {
    res.status(400).json({ b: 'b' });
  }
  res.status(500).json({ a: 'a' });
});

app.listen(process.env.PORT || 3000, () => {
  log.info('🚀 Server started on port 3333');
});
