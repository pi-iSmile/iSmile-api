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
    const newPatient = PatientEntity.create('teste', 'teste@gmail.com', new Date());
    newPatient.id = existingPatient.id;
    // Act
    const result = await underTest.update(newPatient.id, newPatient);
    // Assert
    expect(result.id).toBe(existingPatient.id);
    expect(result.name).toBe(newPatient.name);
    expect(result.email).toBe(newPatient.email);
    expect(result.birthdate).toBe(newPatient.birthdate);
  });
  it('Should throw error if patient does not exist', async () => {
    // Arrange
    const patient = PatientEntity.create('teste', 'teste@gmail.com', new Date());
    patient.id = 1;
    // Act-Assert
    await expect(underTest.update(patient.id, patient)).rejects.toBeInstanceOf(AppError);
  });
});
