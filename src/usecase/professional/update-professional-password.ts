import { inject, injectable } from 'tsyringe';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';
import UpdateProfessionalPasswordDto
  from '../../adapter/presentation/controller/professional/dto/update-professional-password-dto';

@injectable()
export default class UpdateProfessionalPassword {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async updatePassword(id: number, request: UpdateProfessionalPasswordDto): Promise<ProfessionalEntity> {
    const existingProfessional = await this.repository.findById(id);
    if (!existingProfessional) {
      throw new AppError('Professional does not exist');
    }

    // TODO: -> validate if old password is equals request.oldPassword
    existingProfessional.password = request.newPassword;

    return this.repository.update(existingProfessional);
  }
}
