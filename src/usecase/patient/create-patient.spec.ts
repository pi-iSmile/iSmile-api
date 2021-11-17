import { PatientEntity } from '../../entity/patient/patient.entity';
import CreatePatient from './create-patient';
import IPatientRepository from './repository/patient-repository';
import { FakePatientRepository } from '../../dataprovider/typeorm/patient/fake-patient-repository';
import AppError from '../../shared/AppError';

let repository: IPatientRepository;
let underTest: CreatePatient;

describe('CreatePatient', () => {
  beforeEach(() => {
    repository = new FakePatientRepository();
    underTest = new CreatePatient(repository);
  });
  it('Should save patient successfully', async () => {
    // Arrange
    const patient = PatientEntity.create('mockado', 'mockado@gmail.com', new Date());
    // Act
    const result = await underTest.create(patient);
    // Assert
    expect(result).toBe(patient);
  });
  it('Should throw error if patient already exists', async () => {
    // Arrange
    const patient = PatientEntity.create('dummy-name', 'dummy-email@gmail.com', new Date());
    await underTest.create(patient);
    const newPatient = PatientEntity.create('dummy-name', 'dummy-email@gmail.com', new Date());
    // Act-Assert
    await expect(underTest.create(newPatient)).rejects.toBeInstanceOf(AppError);
  });
});
