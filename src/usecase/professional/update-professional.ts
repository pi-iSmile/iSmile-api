import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';
import { ProfessionalStatus } from '../../entity/professional/professional-status';

@injectable()
export default class UpdateProfessional {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async update(id: number, name: string, status: ProfessionalStatus, birthdate: Date): Promise<ProfessionalEntity> {
    const existingProfessional = await this.repository.findById(id);
    if (!existingProfessional) {
      throw new AppError(`Profissional com ID: ${id} não existe.`, 404);
    }
    await this.validateDate(birthdate);

    existingProfessional.name = name;
    existingProfessional.birthdate = birthdate;
    existingProfessional.status = status;

    return this.repository.update(existingProfessional);
  }

  public async validateDate(birthdate: Date) {
    if (isAfter(birthdate, new Date())) {
      throw new AppError('Data de nascimento inválida.');
    }
  }
}
