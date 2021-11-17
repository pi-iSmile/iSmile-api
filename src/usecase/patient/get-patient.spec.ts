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
  it('Should return existing patient successfully', async () => {
    // Arrange
    const patient = await repository.create(PatientEntity.create('mockado', 'mockado@gmail.com', new Date()));
    // Act
    const result = await underTest.findById(patient.id);
    // Assert
    expect(result).toBe(patient);
  });
  it('Should throw error if patient does not exist', async () => {
    // Arrange
    const patient = PatientEntity.create('dummy-name', 'dummy-email@gmail.com', new Date());
    // Act-Assert
    await expect(underTest.findById(-1)).rejects.toBeInstanceOf(AppError);
  });
});
