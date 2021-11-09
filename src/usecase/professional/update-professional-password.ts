import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';
import UpdateProfessionalPasswordDTO
  from '../../adapter/presentation/controller/professional/dto/update-professional-password-d-t-o';

@injectable()
export default class UpdateProfessionalPassword {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {}

  public async updatePassword(id: number, request: UpdateProfessionalPasswordDTO): Promise<ProfessionalEntity> {
    const existingProfessional = await this.repository.findById(id);
    if (!existingProfessional) {
      throw new AppError('Professional does not exist');
    }

    // TODO: -> validate if old password is equals request.oldPassword
    existingProfessional.password = request.newPassword;

    return this.repository.update(existingProfessional);
  }
}
