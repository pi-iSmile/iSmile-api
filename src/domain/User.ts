
class User {
    id: String;
    full_name: String;
    email: String;
    password: String;
    active: Boolean;

    constructor(
        {   id,
            full_name,
            email,
            password,
            active
        }:
        {
            id?: String,
            full_name?: String,
            email?: String,
            password?: String,
            active?: Boolean
        } = {}) {
             
            this.id = id;
            this.full_name = full_name;
            this.email = email;
            this.password = password;
            this.active = active
        }
}