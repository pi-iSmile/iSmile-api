import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AppointmentController from '../../../../../adapter/presentation/controller/appointment/appointment-controller';
import ensureAuthenticated from '../../../../middleware/ensure-authenticated';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      professionalEmail: Joi.string().email().required(),
      patientEmail: Joi.string().email().required(),
      date: Joi.date().iso().required(),
    },
  }),
  appointmentController.create);

appointmentRouter.patch('/:id/confirm',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  appointmentController.confirm);

appointmentRouter.patch('/:id/cancel',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  appointmentController.cancel);

export default appointmentRouter;
