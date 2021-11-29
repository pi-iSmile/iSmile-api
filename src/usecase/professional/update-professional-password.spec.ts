import IProfessionalRepository from './repository/professional-repository';
import UpdateProfessionalPassword from './update-professional-password';
import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import AppError from '../../shared/AppError';
import { hashSync } from 'bcryptjs';
import { compareSync } from 'bcryptjs';

let repository: IProfessionalRepository;
let underTest: UpdateProfessionalPassword;

describe('UpdateProfessionalPassword', () => {
  beforeEach(() => {
    repository = new FakeProfessionalRepository();
    underTest = new UpdateProfessionalPassword(repository);
  });
  it('Should update password successfully', async () => {
    // Arrange
    const oldPassword =  hashSync('old-password', 8);
    const newPassword = 'new-password';
    
    const existingProfessional = await repository.create(ProfessionalEntity.create('dummy-name', 'dummyemail@gmail.com', new Date(), oldPassword));
    
    // Act
    const result = await underTest.updatePassword(existingProfessional.id, 'old-password', newPassword);
    // Assert
    expect(compareSync(newPassword, result.password))
  });
  it('Should throw error if professional does not exist', async () => {
    // Arrange
    const oldPassword = 'old-password';
    const newPassword = 'new-password';
    // Act-Assert
    await expect(underTest.updatePassword(1, oldPassword, newPassword)).rejects.toBeInstanceOf(AppError);
  });
});
