import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import AppointmentController from '../../../../../adapter/presentation/controller/appointment/appointment-controller';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

// appointmentRouter.post('/', appointmentController.create);

appointmentRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      anything: Joi.string(), // TODO -> review sub entities field on JSON and how to attach it to repository
    },
  }),
  appointmentController.create);

export default appointmentRouter;
