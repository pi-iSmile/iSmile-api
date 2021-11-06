import express from 'express';
import { AppointMentController } from './port/AppointmentController';
import { UserController } from './port/UserController';

const router = express.Router();

const userRouter = "/users/";

const appointmentRouter = "/appointments/"


    router
        .get(userRouter, UserController.getUsers)
        .post(userRouter, UserController.createUser)
        .put(userRouter.concat("/:id"), UserController.updateUser)
        .delete(userRouter.concat("/:id"), UserController.deleteUser)
        .get(userRouter.concat("/:id"), UserController.getUser)
        
        .get(appointmentRouter, AppointMentController.getAppointments)
        .post(appointmentRouter, AppointMentController.createAppointment)
        .put(appointmentRouter.concat("/:id"), AppointMentController.updateAppointment)
        .delete(appointmentRouter.concat("/:id"), AppointMentController.deleteAppointment)
        .get(appointmentRouter.concat("/:id"), AppointMentController.getAppointments);

export default router;