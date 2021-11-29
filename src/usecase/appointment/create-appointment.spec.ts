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
import { FakeAppointmentRepository } from '../../dataprovider/typeorm/appointment/fake-appointment-repository';

let repository: IAppointmentRepository;
let patientRepository: IPatientRepository;
let professionalRepository: IProfessionalRepository;
let underTest: CreateAppointment;

const defaultYear = 2021;
const defaultMonth = 11;
const defaultDay = 2;
const defaultHour = 12;
const defaultMinute = 0;
const defaultSecond = 0;

describe('CreateAppointment', () => {
  beforeEach(() => {
    repository = new FakeAppointmentRepository();
    patientRepository = new FakePatientRepository();
    professionalRepository = new FakeProfessionalRepository();
    underTest = new CreateAppointment(repository, patientRepository, professionalRepository);
    jest.resetAllMocks();
  });
  it('Should save appointment successfully', async () => {
    const mockDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour, defaultMinute, defaultSecond);
    jest.useFakeTimers().setSystemTime(mockDate);

    const patient = await patientRepository.create(PatientEntity.create('test', 'test@gmail.com', new Date()));
    const professional = await professionalRepository.create(ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123'));

    const appointmentDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour + 1, defaultMinute, defaultSecond);

    const result = await underTest.create(appointmentDate, professional.email, patient.email);

    expect(result.date).toBe(appointmentDate);
    expect(result.status).toBe(AppointmentStatus.PENDING);
    expect(result.patient).toBe(patient);
    expect(result.professional).toBe(professional);
  });

  it('Should throw exception if Patient does not exist', async () => {
    const mockDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour, defaultMinute, defaultSecond);
    jest.useFakeTimers().setSystemTime(mockDate);

    const patient = await PatientEntity.create('test', 'test@gmail.com', new Date());
    const professional = await professionalRepository.create(ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123'));

    const appointmentDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour + 1, defaultMinute, defaultSecond);

    await expect(underTest.create(appointmentDate, professional.email, patient.email)).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw exception if Professional does not exist', async () => {
    const mockDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour, defaultMinute, defaultSecond);
    jest.useFakeTimers().setSystemTime(mockDate);

    const patient = await patientRepository.create(PatientEntity.create('test', 'test@gmail.com', new Date()));
    const professional = await ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123');

    const appointmentDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour + 1, defaultMinute, defaultSecond);

    await expect(underTest.create(appointmentDate, professional.email, patient.email)).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw exception if date is on past', async () => {
    const mockDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour, defaultMinute, defaultSecond);
    jest.useFakeTimers().setSystemTime(mockDate);

    const patient = await patientRepository.create(PatientEntity.create('test', 'test@gmail.com', new Date()));
    const professional = await professionalRepository.create(ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123'));

    const appointmentDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour - 1, defaultMinute, defaultSecond);

    await expect(underTest.create(appointmentDate, professional.email, patient.email)).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw exception if date is before 08:00', async () => {
    const mockDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour, defaultMinute, defaultSecond);
    jest.useFakeTimers().setSystemTime(mockDate);

    const patient = await patientRepository.create(PatientEntity.create('test', 'test@gmail.com', new Date()));
    const professional = await professionalRepository.create(ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123'));

    const appointmentDate = new Date(defaultYear, defaultMonth, defaultDay, 7, defaultMinute, defaultSecond);

    await expect(underTest.create(appointmentDate, professional.email, patient.email)).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw exception if date is after 18:00', async () => {
    const mockDate = new Date(defaultYear, defaultMonth, defaultDay, defaultHour, defaultMinute, defaultSecond);
    jest.useFakeTimers().setSystemTime(mockDate);

    const patient = await patientRepository.create(PatientEntity.create('test', 'test@gmail.com', new Date()));
    const professional = await professionalRepository.create(ProfessionalEntity.create('test', 'test@gmail.com', new Date(), '123'));

    const appointmentDate = new Date(defaultYear, defaultMonth, defaultDay, 20, defaultMinute, defaultSecond);

    await expect(underTest.create(appointmentDate, professional.email, patient.email)).rejects.toBeInstanceOf(AppError);
  });
});
