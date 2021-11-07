import { Either, left, right } from '../../../shared/Either';
import { InvalidNameError } from './error/invalid-name-error';

export class Name {
    private readonly name: string

    private constructor(name: string) {
      this.name = name;
      Object.freeze(this);
    }

    static create(name: string): Either<InvalidNameError, Name> {
      if (!Name.validate(name)) {
        return left(new InvalidNameError(name));
      }
      return right(new Name(name.trim()));
    }

    get value(): string {
      return this.name;
    }

    static validate(name: string): boolean {
      if (!name || name.trim().length < 2 || name.trim().length > 255) {
        return false;
      }
      return true;
    }
}
