export class Patient {
    id: String;
    name: String;
    email: String;
    bithdate: Date;

    constructor(
        {   id,
            name,
            email,
            birthdate
        }:
        {
            id?: String,
            name?: String,
            email?: String,
            birthdate?: Date
        } = {}) {
             
            this.id = id;
            this.name = name;
            this.email = email;
            this.bithdate = this.bithdate
        }
}