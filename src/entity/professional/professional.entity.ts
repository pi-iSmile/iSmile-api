import { Column, Entity } from 'typeorm';
import BasePerson from '../shared/base-person';
import { ProfessionalStatus } from './professional-status';

@Entity('professional')
export class ProfessionalEntity extends BasePerson {
  private constructor(name: string, email: string, birthdate: Date, password: string, status: ProfessionalStatus = ProfessionalStatus.ENABLED) {
    super(name, email, birthdate);
    this.password = password;
    this.status = status;
  }

    @Column({ name: 'password' })
    public password: string

    @Column({
      name: 'status',
      type: 'enum',
      enum: ProfessionalStatus,
      default: ProfessionalStatus.ENABLED,
    })
    status: ProfessionalStatus;

    static create(name: string, email: string, birthdate: Date, password: string): ProfessionalEntity {
      return new ProfessionalEntity(name, email, birthdate, password);
    }
}
