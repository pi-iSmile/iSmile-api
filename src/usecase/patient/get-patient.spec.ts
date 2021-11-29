import { PatientEntity } from '../../entity/patient/patient.entity';
import IPatientRepository from './repository/patient-repository';
import { FakePatientRepository } from '../../dataprovider/typeorm/patient/fake-patient-repository';
import AppError from '../../shared/AppError';
import GetPatient from './get-patient';

let repository: IPatientRepository;
let underTest: GetPatient;

describe('UpdatePatient', () => {
  beforeEach(() => {
    repository = new FakePatientRepository();
    underTest = new GetPatient(repository);
  });
  it('Should return existing patient successfully by id', async () => {
    // Arrange
    const patient = await repository.create(PatientEntity.create('mockado', 'mockado@gmail.com', new Date()));
    // Act
    const result = await underTest.findById(patient.id);
    // Assert
    expect(result).toBe(patient);
  });
  it('Should throw error if patient does not exist by id', async () => {
    // Act-Assert
    await expect(underTest.findById(-1)).rejects.toBeInstanceOf(AppError);
  });

  it('Should return existing patient successfully by email', async () => {
    // Arrange
    const patient = await repository.create(PatientEntity.create('mockado', 'mockado@gmail.com', new Date()));
    // Act
    const result = await underTest.findByEmail(patient.email);
    // Assert
    expect(result).toBe(patient);
  });

  it('Should throw error if patient does not exist by email', async () => {
    // Act-Assert
    await expect(underTest.findByEmail('dummyemail@gmail.com')).rejects.toBeInstanceOf(AppError);
  });

  it('Should return all existing patients', async () => {
    await repository.create(PatientEntity.create('mockado', 'mockado@gmail.com', new Date()));
    await repository.create(PatientEntity.create('mockado2', 'mockado2@gmail.com', new Date()));
    const result = await underTest.findAll();
    expect(result.length).toBe(2);
  });
});
