import { inject, injectable } from 'tsyringe';
import { compareSync } from 'bcryptjs';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';

@injectable()
export default class UpdateProfessionalPassword {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async updatePassword(id: number, oldPassword: string, newPassword: string): Promise<ProfessionalEntity> {
    const existingProfessional = await this.repository.findById(id);
    if (!existingProfessional) {
      throw new AppError(`Profissional com ID: ${id} não existe.`, 404);
    }

    if (!compareSync(oldPassword, existingProfessional.password)) {
      throw new AppError('Credenciais inválidas.', 403);
    }

    existingProfessional.password = newPassword;

    return this.repository.update(existingProfessional);
  }
}
