import { DomainError } from '../../error/domain-error';

export class InvalidNameError extends Error implements DomainError {
  constructor(name: string) {
    super(`Name "${name}" is not valid`);
    this.name = 'InvalidNameError';
  }
}
