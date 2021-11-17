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
    const professional = ProfessionalEntity.create('dummy-name', 'dummyemail@gmail.com', new Date(), 'password');
    // Act
    const result = await underTest.create(professional);
    // Assert
    expect(result).toBe(professional);
  });
  it('Should throw error if professional already exists', async () => {
    // Arrange
    await repository.create(ProfessionalEntity.create('dummy-name', 'dummyemail@gmail.com', new Date(), 'password'));
    const newProfessional = ProfessionalEntity.create('other-name', 'dummyemail@gmail.com', new Date(), 'other-password');
    // Act-Assert
    await expect(underTest.create(newProfessional)).rejects.toBeInstanceOf(AppError);
  });
  it('Should throw error if professional birthdate is in future', async () => {
    // Arrange
    const newBirthdate = new Date();
    newBirthdate.setMonth(newBirthdate.getMonth() + 1);
    const professional = ProfessionalEntity.create('dummy-name', 'diffemail@gmail.com', newBirthdate, 'password');
    // Act-Assert
    await expect(underTest.create(professional)).rejects.toBeInstanceOf(AppError);
  });
});
