import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AppointmentController from '../../../../../adapter/presentation/controller/appointment/appointment-controller';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      professionalEmail: Joi.string().email().required(),
      patientEmail: Joi.string().email().required(),
      date: Joi.date().iso().required(),
    },
  }),
  appointmentController.create);

export default appointmentRouter;
