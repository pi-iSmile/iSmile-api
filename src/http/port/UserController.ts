import { Response, Request } from "express";

export class UserController {

    static getUsers = async (req: Request, res: Response) => {
        res.send("List of users");
    }

    static getUser = async (req: Request, res: Response) => {
        res.send("user");
    }

    static createUser = async (req: Request, res: Response) => {
        res.send("user");
    }

    static deleteUser = async (req: Request, res: Response) => {
        res.send("user deleted");
    }

    static updateUser = async (req: Request, res: Response) => {
        res.send("user updated");
    }
}
