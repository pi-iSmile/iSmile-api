import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfessionalController from '../../../../../adapter/presentation/controller/professional/professional-controller';
import CreateProfessional from '../../../../../usecase/professional/create-appointment';
import ProfessionalRepository from '../../../../../dataprovider/typeorm/professional/professional-repository';

const professionalRouter = Router();

const professionalRepository = new ProfessionalRepository();
const createProfessional = new CreateProfessional(professionalRepository);
const professionalController = new ProfessionalController(createProfessional);

professionalRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      birthdate: Joi.date().required(),
    },
  }),
  professionalController.create,
);

export default professionalRouter;
