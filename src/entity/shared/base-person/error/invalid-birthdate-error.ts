import { DomainError } from '../../error/domain-error';

export class InvalidBirthdateError extends Error implements DomainError {
  constructor(date: Date) {
    super(`Birthdate "${date}" is not valid`);
    this.name = 'InvalidBirthdateError';
  }
}
