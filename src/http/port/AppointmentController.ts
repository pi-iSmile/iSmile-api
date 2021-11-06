import { Response, Request } from "express";

export class AppointMentController {

    static getAppointments = async (req: Request, res: Response) => {
        res.send("List of appointments");
    }

    static getAppointment = async (req: Request, res: Response) => {
        res.send("appointment");
    }

    static createAppointment = async (req: Request, res: Response) => {
        res.send("appointment");
    }

    static deleteAppointment = async (req: Request, res: Response) => {
        res.send("appointment deleted");
    }

    static updateAppointment = async (req: Request, res: Response) => {
        res.send("appointment updated");
    }
}