import express from 'express';
import { AppointMentController } from './port/AppointmentController';
import { PatientController } from './port/PatientController';

const router = express.Router();

const userRouter = "/patients/";

const appointmentRouter = "/appointments/"


    router
        .get(userRouter, PatientController.getAll)
        .post(userRouter, PatientController.create)
        .put(userRouter.concat("/:id"), PatientController.update)
        .delete(userRouter.concat("/:id"), PatientController.delete)
        .get(userRouter.concat("/:id"), PatientController.get)
        
        .get(appointmentRouter, AppointMentController.getAppointments)
        .post(appointmentRouter, AppointMentController.createAppointment)
        .put(appointmentRouter.concat("/:id"), AppointMentController.updateAppointment)
        .delete(appointmentRouter.concat("/:id"), AppointMentController.deleteAppointment)
        .get(appointmentRouter.concat("/:id"), AppointMentController.getAppointments);

export default router;