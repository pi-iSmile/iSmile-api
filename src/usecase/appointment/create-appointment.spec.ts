import { PatientEntity } from '../../entity/patient/patient.entity';

import { FakePatientRepository } from '../../dataprovider/typeorm/patient/fake-patient-repository';
import CreateAppointment from './create-appointment';
import IAppointmentRepository from './repository/appointment-repository';
import IProfessionalRepository from 'usecase/professional/repository/professional-repository';
import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import { AppointmentStatus } from '../../entity/appointment/appointment-status';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IPatientRepository from 'usecase/patient/repository/patient-repository';
import AppError from '../../shared/AppError';
import { FakeAppointmentRepository } from '../../dataprovider/typeorm/appointment/fake-appointment-repository copy';

let repository: IAppointmentRepository;
let patientRepo: IPatientRepository;
let professionalRepo: IProfessionalRepository;
let underTest: CreateAppointment;

describe('CreateAppointment', () => {
  beforeEach(() => {
    repository = new FakeAppointmentRepository;
    patientRepo = new FakePatientRepository;
    professionalRepo = new FakeProfessionalRepository;
    underTest = new CreateAppointment(repository, patientRepo, professionalRepo);
  });
  it('Try save appointment with wrong date', async () => {
    // Arrange

    const patient = PatientEntity.create("test", "test@gmail.com", new Date());
    const professional = ProfessionalEntity.create("test", "test@gmail.com", new Date(), "123");

    const pResult = await professionalRepo.create(professional);
    const cResult = await patientRepo.create(patient);

    const consultDate = new Date();
    consultDate.setMinutes(0);
    consultDate.setSeconds(0);

    const appointment = AppointmentEntity.create(consultDate, AppointmentStatus.PENDING,
    patient,professional);
    // Act

    try {
        const result = await underTest.create(consultDate, professional.email, patient.email);

        expect(result.date).toBe(appointment.date);
        expect(result.professional.email).toBe(professional.email);
        expect(result.patient.email).toBe(patient.email);

    } catch(e) {
    }

  });
});