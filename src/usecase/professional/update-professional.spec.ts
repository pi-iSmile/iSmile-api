import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import AppError from '../../shared/AppError';
import IProfessionalRepository from './repository/professional-repository';
import UpdateProfessional from './update-professional';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';

let repository: IProfessionalRepository;
let underTest: UpdateProfessional;

describe('UpdateProfessional', () => {
  beforeEach(() => {
    repository = new FakeProfessionalRepository();
    underTest = new UpdateProfessional(repository);
  });
  it('Should update existing professional successfully', async () => {
    // Arrange
    const existingProfessional = await repository.create(ProfessionalEntity.create('mockado', 'mockado@gmail.com', new Date(), '123'));
    const newProfessional = ProfessionalEntity.create('teste', 'teste@gmail.com', new Date(), '123');
    newProfessional.id = existingProfessional.id;
    // Act
    const result = await underTest.update(newProfessional.id, newProfessional);
    // Assert
    expect(result.id).toBe(existingProfessional.id);
    expect(result.name).toBe(newProfessional.name);
    expect(result.birthdate).toBe(newProfessional.birthdate);
  });
  it('Should throw error if professional does not exist', async () => {
    // Arrange
    const professional = ProfessionalEntity.create('teste', 'teste@gmail.com', new Date(), '123');
    professional.id = 1;
    // Act-Assert
    await expect(underTest.update(professional.id, professional)).rejects.toBeInstanceOf(AppError);
  });
});
