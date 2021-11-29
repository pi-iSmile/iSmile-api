import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import LandingController from '../../../../../adapter/presentation/controller/landing/landing-controller';

const landingRouter = Router();
const landingController = new LandingController();

landingRouter.get('/professionals', landingController.getAllProfessionals);

landingRouter.get('/appointments',
  celebrate({
    [Segments.QUERY]: {
      professional_id: Joi.number().integer().positive().required(),
    },
  }),
  landingController.getAvailableHours);

export default landingRouter;
