import { Name } from './name';
import { Email } from './email';
import { Birthdate } from './birthdate';

export default abstract class BasePerson {
    public readonly name: Name

    public readonly email: Email

    public readonly birthdate: Birthdate

    protected constructor(name: Name, email: Email, birthdate: Birthdate) {
      this.name = name;
      this.email = email;
      this.birthdate = birthdate;
      Object.freeze(this);
    }
}
