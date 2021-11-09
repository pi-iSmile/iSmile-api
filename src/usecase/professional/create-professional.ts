import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';

@injectable()
export default class CreateProfessional {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {}

  public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
    await this.validate(request);

    return this.repository.create(request);
  }

  public async validate(request: ProfessionalEntity) {
    if (await this.repository.findByEmail(request.email) != null) {
      throw new AppError('Professional with this e-mail already exists.');
    }

    if (isAfter(request.birthdate, new Date())) {
      throw new AppError('Birthdate must be in the past.');
    }
  }
}
