import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfessionalController
  from '../../../../../adapter/presentation/controller/professional/professional-controller';
import ensureAuthenticated from '../../../../middleware/ensure-authenticated';

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
      status: Joi.string().valid('ENABLED', 'DISABLED').required(), // TODO -> convert enum to string
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  ensureAuthenticated,
  professionalController.update,
);

professionalRouter.put(
  '/:id/password',
  celebrate({
    [Segments.BODY]: {
      oldPassword: Joi.string().min(4).max(255).required(),
      newPassword: Joi.string().min(4).max(255).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  ensureAuthenticated,
  professionalController.updatePassword,
);

professionalRouter.get(
  '/:email',
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().email().required(),
    },
  }),
  ensureAuthenticated,
  professionalController.findByEmail,
);

professionalRouter.get(
  '/',
  ensureAuthenticated,
  professionalController.findAll,
);

export default professionalRouter;
