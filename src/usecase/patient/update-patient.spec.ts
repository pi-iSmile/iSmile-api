import { PatientEntity } from '../../entity/patient/patient.entity';
import IPatientRepository from './repository/patient-repository';
import { FakePatientRepository } from '../../dataprovider/typeorm/patient/fake-patient-repository';
import AppError from '../../shared/AppError';
import UpdatePatient from './update-patient';

let repository: IPatientRepository;
let underTest: UpdatePatient;

describe('UpdatePatient', () => {
  beforeEach(() => {
    repository = new FakePatientRepository();
    underTest = new UpdatePatient(repository);
  });
  it('Should update existing patient successfully', async () => {
    // Arrange
    const existingPatient = await repository.create(PatientEntity.create('mockado', 'mockado@gmail.com', new Date()));
    // Act
    const date = new Date();
    const result = await underTest.update(existingPatient.id, 'teste', 'teste@gmail.com', date);
    // Assert
    expect(result.id).toBe(existingPatient.id);
    expect(result.name).toBe('teste');
    expect(result.email).toBe('teste@gmail.com');
    expect(result.birthdate).toBe(date);
  });
  it('Should throw error if patient does not exist', async () => {
    // Act-Assert
    await expect(underTest.update(1, 'teste', 'teste@gmail.com', new Date())).rejects.toBeInstanceOf(AppError);
  });
});
