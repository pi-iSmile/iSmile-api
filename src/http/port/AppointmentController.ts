import { AppointmentService } from "../../application/AppointmentService";
import { Appointment } from "../../domain/Appointment";
import { Response, Request } from "express";

export class AppointMentController {

    static getAppointments = async (req: Request, res: Response) => {
        res.send(AppointmentService.findAll());
    }

    static getAppointment = async (req: Request, res: Response) => {
        res.send(AppointmentService.find(new Appointment()));
    }

    static createAppointment = async (req: Request, res: Response) => {
        res.send(AppointmentService.create(new Appointment()));
    }

    static deleteAppointment = async (req: Request, res: Response) => {
        res.send(AppointmentService.delete(new Appointment()));
    }

    static updateAppointment = async (req: Request, res: Response) => {
        res.send(AppointmentService.update(new Appointment()));
    }
}