import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfessionalController from '../../../../../adapter/presentation/controller/professional/professional-controller';

const professionalRouter = Router();
const professionalController = new ProfessionalController();

professionalRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      status: Joi.string().required(), // TODO -> create enum for status, remove from POST and put only on PUT
    },
  }),
  professionalController.create,
);

export default professionalRouter;
