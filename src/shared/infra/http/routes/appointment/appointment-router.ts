import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AppointmentController from '../../../../../adapter/presentation/controller/appointment/appointment-controller';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date().iso().required(),
      status: Joi.required(),
      patientId: Joi.number().required(),
      professionalId: Joi.number().required() 
    },
  }),
  appointmentController.create);

appointmentRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date().iso().required(),
      status: Joi.required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().positive().required(),
    }
  }),
  appointmentController.update);

export default appointmentRouter;
