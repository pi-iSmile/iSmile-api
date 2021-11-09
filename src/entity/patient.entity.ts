import { Entity } from 'typeorm';
import BasePerson from './base-person';

@Entity('patient')
export class PatientEntity extends BasePerson {
  private constructor(name: string, email: string, birthdate: Date) {
    super(name, email, birthdate);
  }

  static create(name: string, email: string, birthdate: Date): PatientEntity {
    return new PatientEntity(
      name,
      email,
      birthdate,
    );
  }
}
