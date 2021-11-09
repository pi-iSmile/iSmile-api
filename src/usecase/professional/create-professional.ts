import { inject, injectable } from 'tsyringe';
import { ProfessionalEntity } from '../../entity/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';

@injectable()
export default class CreateProfessional {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {}

  public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
    return this.repository.create(request);
  }
}
