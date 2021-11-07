import { isAfter } from 'date-fns';
import { Either, left, right } from '../../../shared/Either';
import { InvalidBirthdateError } from './error/invalid-birthdate-error';

export class Birthdate {
    private readonly birthdate: Date

    private constructor(birthdate: Date) {
      this.birthdate = birthdate;
      Object.freeze(this);
    }

    static create(birthdate: Date): Either<InvalidBirthdateError, Birthdate> {
      if (!Birthdate.validate(birthdate)) {
        return left(new InvalidBirthdateError(birthdate));
      }
      return right(new Birthdate(birthdate));
    }

    get value(): Date {
      return this.birthdate;
    }

    static validate(birthdate: Date): boolean {
      return !isAfter(birthdate, Date.now());
    }
}
