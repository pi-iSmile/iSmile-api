import AppError from '../../shared/AppError';
import IProfessionalRepository from './repository/professional-repository';
import CreateProfessional from './create-professional';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';

let repository: IProfessionalRepository;
let underTest: CreateProfessional;

describe('CreateProfessional', () => {
  beforeEach(() => {
    repository = new FakeProfessionalRepository();
    underTest = new CreateProfessional(repository);
  });
  it('Should save professional successfully', async () => {
    // Arrange
    const name = 'dummy-name';
    const email = 'dummyemail@gmail.com';
    const password = 'dummy-password';
    const date = new Date();
    // Act
    const result = await underTest.create(name, email, password, date);
    // Assert
    expect(result.name).toBe(name);
    expect(result.email).toBe(email);
    expect(result.password).toBe(password);
    expect(result.birthdate).toBe(date);
  });
  it('Should throw error if professional already exists', async () => {
    // Arrange
    await repository.create(ProfessionalEntity.create('dummy-name', 'dummyemail@gmail.com', new Date(), 'password'));
    const newProfessional = ProfessionalEntity.create('other-name', 'dummyemail@gmail.com', new Date(), 'other-password');
    // Act-Assert
    await expect(underTest.create(newProfessional.name, newProfessional.email, newProfessional.password, newProfessional.birthdate)).rejects.toBeInstanceOf(AppError);
  });
  it('Should throw error if professional birthdate is in future', async () => {
    // Arrange
    const newBirthdate = new Date();
    newBirthdate.setMonth(newBirthdate.getMonth() + 1);
    const professional = ProfessionalEntity.create('dummy-name', 'diffemail@gmail.com', newBirthdate, 'password');
    // Act-Assert
    await expect(underTest.create(professional.name, professional.email, professional.password, professional.birthdate)).rejects.toBeInstanceOf(AppError);
  });
});
