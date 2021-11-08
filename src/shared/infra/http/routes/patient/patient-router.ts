import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PatientController from '../../../../../adapter/presentation/controller/patient/patient-controller';
import ProfessionalController from '../../../../../adapter/presentation/controller/professional/professional-controller';

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      status: Joi.string(), // TODO -> create enum for status, maybe remove from the create path and put only on PUT
    },
  }),
  patientController.create,
);

export default patientRouter;
