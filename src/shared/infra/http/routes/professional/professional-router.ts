import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfessionalController from '../../../../../adapter/presentation/controller/professional/professional-controller';

const professionalRouter = Router();

const professionalController = new ProfessionalController();

professionalRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(255).required(),
      birthdate: Joi.date().iso().required(),
    },
  }),
  professionalController.create,
);

professionalRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(5).max(255).required(),
      birthdate: Joi.date().iso().required(),
      status: Joi.string().valid('ENABLED, DISABLED'),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  professionalController.update,
);

professionalRouter.put(
  '/:id/password',
  celebrate({
    [Segments.BODY]: {
      old_password: Joi.string().min(4).max(255).required(),
      new_password: Joi.string().min(4).max(255).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  professionalController.updatePassword,
);

export default professionalRouter;
