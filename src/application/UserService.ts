import { User } from "../domain/User";

export class UserService {

    static create = async (user: User) => {
        return new User()
    }

    static find = async (user: User) => {
        return new User()
    }

    static findAll = async () => {
        return new Array(new User())
    }

    static delete = async (User: User) => {

    }

    static update = async (user: User) => {
        return new User()
    }

}