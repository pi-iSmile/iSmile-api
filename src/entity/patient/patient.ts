import BasePerson from '../shared/base-person/base-person';
import { Name } from '../shared/base-person/name';
import { Birthdate } from '../shared/base-person/birthdate';
import { Email } from '../shared/base-person/email';
import { PersonData } from '../shared/base-person/person-data';
import { Either, left, right } from '../../shared/Either';
import { InvalidNameError } from '../shared/base-person/error/invalid-name-error';
import { InvalidEmailError } from '../shared/base-person/error/invalid-email-error';
import { InvalidBirthdateError } from '../shared/base-person/error/invalid-birthdate-error';

class Patient extends BasePerson {
  // public id:

  private constructor(name: Name, email: Email, birthdate: Birthdate) {
    super(name, email, birthdate);
  }

  static create(data: PersonData): Either<InvalidNameError | InvalidEmailError | InvalidBirthdateError, BasePerson> {
    const nameOrError: Either<InvalidNameError, Name> = Name.create(data.name);
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(data.email);
    const birthdateOrError: Either<InvalidBirthdateError, Birthdate> = Birthdate.create(data.birthdate);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (birthdateOrError.isLeft()) {
      return left(birthdateOrError.value);
    }
    return right(new Patient(
      nameOrError.value,
      emailOrError.value,
      birthdateOrError.value,
    ));
  }
}
