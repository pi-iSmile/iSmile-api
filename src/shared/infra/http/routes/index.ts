import { Router } from 'express';

import appointmentRouter from '../routes/appointment/appointment-router';
import professionalRouter from '../routes/professional/professional-router';
import patientRouter from '../routes/patient/patient-router';
import sessionRouter from '../routes/session/session-router';
import landingRouter from '../routes/landing/landing-router';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/professionals', professionalRouter);
routes.use('/patients', patientRouter);
routes.use('/sessions', sessionRouter);
routes.use('/landing', landingRouter);

export default routes;
