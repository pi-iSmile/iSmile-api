import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import AppError from '../../shared/AppError';
import IProfessionalRepository from './repository/professional-repository';
import UpdateProfessional from './update-professional';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import { ProfessionalStatus } from '../../entity/professional/professional-status';

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
    const newName = 'teste';
    const newStatus = ProfessionalStatus.DISABLED;
    const newBirthdate = new Date();
    // Act
    const result = await underTest.update(existingProfessional.id, newName, newStatus, newBirthdate);
    // Assert
    expect(result.id).toBe(existingProfessional.id);
    expect(result.name).toBe(newName);
    expect(result.status).toBe(newStatus);
    expect(result.birthdate).toBe(newBirthdate);
  });
  it('Should throw error if professional does not exist', async () => {
    // Act-Assert
    await expect(underTest.update(1, 'dummy-name', ProfessionalStatus.DISABLED, new Date())).rejects.toBeInstanceOf(AppError);
  });
});
