import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientController from '../../../../../adapter/presentation/controller/patient/patient-controller';
import ensureAuthenticated from '../../../../middleware/ensure-authenticated';

const patientRouter = Router();

const patientController = new PatientController();

patientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(5).max(255)
        .required(),
      email: Joi.string().required(),
      birthdate: Joi.date().required(),
    },
  }),
  patientController.create,
);

patientRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(5).max(255)
        .required(),
      email: Joi.string().email().required(),
      birthdate: Joi.date().iso().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  ensureAuthenticated,
  patientController.update,
);

patientRouter.get(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(5).max(255)
        .required(),
      email: Joi.string().required(),
      birthdate: Joi.date().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  ensureAuthenticated,
  patientController.findById,
);

export default patientRouter;
