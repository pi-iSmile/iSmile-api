import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import DashboardController from '../../../../../adapter/presentation/controller/dashboard/dashboard-controller';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.get('/',
  celebrate({
    [Segments.QUERY]: {
      initialDate: Joi.date(),
      finalDate: Joi.date(),
      status: Joi.string().valid('PENDING', 'CONFIRMED', 'CANCELED', 'FINISHED', 'EXPIRED'),
      professionalEmail: Joi.string().email(),
      patientEmail: Joi.string().email(),
    },
  }),
  dashboardController.getAppointments);

export default dashboardRouter;
