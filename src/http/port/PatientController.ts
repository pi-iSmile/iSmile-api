import { UserService } from "../../application/UserService";
import { Patient } from "../../domain/Patient";
import { Response, Request } from "express";

export class PatientController {

    static getAll = async (req: Request, res: Response) => {
        res.send(UserService.findAll());
    }

    static get = async (req: Request, res: Response) => {
        res.send(UserService.find(new Patient()));
    }

    static create = async (req: Request, res: Response) => {
        res.send(UserService.create(new Patient()));
    }

    static delete = async (req: Request, res: Response) => {
        res.send(UserService.delete(new Patient()));
    }

    static update = async (req: Request, res: Response) => {
        res.send(UserService.update(new Patient()));
    }
}
