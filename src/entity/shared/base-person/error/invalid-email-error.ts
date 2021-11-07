import { DomainError } from '../../error/domain-error';

export class InvalidEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`Email "${email}" is not valid`);
    this.name = 'InvalidEmailError';
  }
}
