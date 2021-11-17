import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';

@injectable()
export default class GetProfessional {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async findById(id: number): Promise<ProfessionalEntity> {
    const professioanl = await this.repository.findById(id);
    if (!professioanl) {
      throw new AppError('Professinal does not exist.');
    }
    return professioanl;
  }
}
