import { Either, left, right } from '../../../shared/Either';
import { InvalidEmailError } from './error/invalid-email-error';

export class Email {
    private readonly email: string

    private constructor(email: string) {
      this.email = email;
      Object.freeze(this);
    }

    static create(email: string): Either<InvalidEmailError, Email> {
      if (!Email.validate(email)) {
        return left(new InvalidEmailError(email));
      }
      return right(new Email(email));
    }

    get value(): string {
      return this.email;
    }

    static validate(email: string): boolean {
      const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
      if (!email) {
        return false;
      }
      return regExp.test(email);
    }
}
