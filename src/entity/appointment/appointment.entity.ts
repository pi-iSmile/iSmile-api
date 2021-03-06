import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from '../shared/base-entity';
import { AppointmentStatus } from './appointment-status';
import { PatientEntity } from '../patient/patient.entity';
import { ProfessionalEntity } from '../professional/professional.entity';

@Entity('appointment')
export class AppointmentEntity extends BaseEntity {
  private constructor(date: Date, status: AppointmentStatus = AppointmentStatus.PENDING, patient: PatientEntity, professional: ProfessionalEntity) {
    super();
    this.date = date;
    this.status = status;
    this.patient = patient;
    this.professional = professional;
  }

    @Column({ name: 'date' })
    public date: Date

    @Column({
      name: 'status',
      type: 'enum',
      enum: AppointmentStatus,
      default: AppointmentStatus.PENDING,
    })
    status: AppointmentStatus;

    @ManyToOne(() => PatientEntity, { eager: true })
    patient: PatientEntity;

    @ManyToOne(() => ProfessionalEntity, { eager: true })
    professional: ProfessionalEntity;

    static create(date: Date, status: AppointmentStatus = AppointmentStatus.PENDING, patient: PatientEntity, professional: ProfessionalEntity): AppointmentEntity {
      return new AppointmentEntity(
        date,
        status,
        patient,
        professional,
      );
    }
}
