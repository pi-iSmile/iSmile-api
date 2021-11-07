import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentController from '../../../../../adapter/presentation/controller/appointment/appointment-controller';
import professionalRouter from '../professional/professional-router';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      anything: Joi.string().required(), // TODO -> review sub entities field on JSON and how to attach it to repository
    },
  }),
  appointmentController.create,
);

export default appointmentRouter;
