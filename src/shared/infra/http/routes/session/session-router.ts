import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../../../../../adapter/presentation/controller/session/session-controller';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(255).required(),
    },
  }),
  sessionController.login,
);

export default sessionRouter;
