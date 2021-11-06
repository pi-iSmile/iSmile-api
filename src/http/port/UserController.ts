import { UserService } from "../../application/UserService";
import { User } from "../../domain/User";
import { Response, Request } from "express";

export class UserController {

    static getUsers = async (req: Request, res: Response) => {
        res.send(UserService.findAll());
    }

    static getUser = async (req: Request, res: Response) => {
        res.send(UserService.find(new User()));
    }

    static createUser = async (req: Request, res: Response) => {
        res.send(UserService.create(new User()));
    }

    static deleteUser = async (req: Request, res: Response) => {
        res.send(UserService.delete(new User()));
    }

    static updateUser = async (req: Request, res: Response) => {
        res.send(UserService.update(new User()));
    }
}
