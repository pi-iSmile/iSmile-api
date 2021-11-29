import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import GetProfessional from './get-professional';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import AppError from '../../shared/AppError';
import IProfessionalRepository from './repository/professional-repository';

let repository: IProfessionalRepository;
let underTest: GetProfessional;

describe('GetProfessional', () => {
  beforeEach(() => {
    repository = new FakeProfessionalRepository();
    underTest = new GetProfessional(repository);
  });
  it('Should return existing professional by id successfully', async () => {
    // Arrange
    const professional = await repository.create(ProfessionalEntity.create('mockado', 'mockado@gmail.com', new Date(), '123'));
    // Act
    const result = await underTest.findById(professional.id);
    // Assert
    expect(result).toBe(professional);
  });
  it('Should throw error if professional does not exist by id', async () => {
    // Arrange
    const professional = ProfessionalEntity.create('dummy-name', 'dummy-email@gmail.com', new Date(), '123');
    // Act-Assert
    await expect(underTest.findById(-1)).rejects.toBeInstanceOf(AppError);
  });

  it('Should return existing professional by email successfully', async () => {
    // Arrange
    const professional = await repository.create(ProfessionalEntity.create('mockado', 'mockado@gmail.com', new Date(), '123'));
    // Act
    const result = await underTest.findByEmail(professional.email);
    // Assert
    expect(result).toBe(professional);
  });

  it('Should throw error if professional does not exist by email', async () => {
    await expect(underTest.findByEmail('anything@gmail.com')).rejects.toBeInstanceOf(AppError);
  });

  it('Should return all professionals', async () => {
    // Arrange
    await repository.create(ProfessionalEntity.create('mockado', 'mockado@gmail.com', new Date(), '123'));
    await repository.create(ProfessionalEntity.create('mockado2', 'mockado2@gmail.com', new Date(), '123'));
    // Act
    const result = await underTest.findAll();
    // Assert
    expect(result.length).toBe(2);
  });
});
