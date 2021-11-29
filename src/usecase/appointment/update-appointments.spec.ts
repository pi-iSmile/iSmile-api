import IProfessionalRepository from 'usecase/professional/repository/professional-repository';
import IPatientRepository from 'usecase/patient/repository/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';

import { FakePatientRepository } from '../../dataprovider/typeorm/patient/fake-patient-repository';
import CreateAppointment from './create-appointment';
import IAppointmentRepository from './repository/appointment-repository';
import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import { AppointmentStatus } from '../../entity/appointment/appointment-status';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import AppError from '../../shared/AppError';
import UpdateAppointment from './update-appointment';
import { FakeAppointmentRepository } from '../../dataprovider/typeorm/appointment/fake-appointment-repository';

let repository: IAppointmentRepository;
let underTest: UpdateAppointment;

describe('UpdateAppointment', () => {
  beforeEach(() => {
    repository = new FakeAppointmentRepository();
    underTest = new UpdateAppointment(repository);
  });
  it('Try update appointment', async () => {
    const patient = PatientEntity.create('test', 'test@gmail.com', new Date());
    const professional = ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123');

    const consultDate = new Date();
    consultDate.setMinutes(0);
    consultDate.setSeconds(0);

    const appointment = AppointmentEntity.create(consultDate, AppointmentStatus.PENDING,
      patient, professional);

    await repository.create(appointment);

    const result = await underTest.updateStatus(appointment.id, AppointmentStatus.CANCELED);

    expect(result.status).toBe(AppointmentStatus.CANCELED);
  });
});
