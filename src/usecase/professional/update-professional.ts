import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import IProfessionalRepository from './repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';
import UpdateProfessionalDTO from '../../adapter/presentation/controller/professional/dto/update-professional-dto';

@injectable()
export default class UpdateProfessional {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async update(id: number, request: UpdateProfessionalDTO): Promise<ProfessionalEntity> {
    const existingProfessional = await this.repository.findById(id);
    if (!existingProfessional) {
      throw new AppError('Professional does not exist');
    }
    await this.validate(request);

    existingProfessional.name = request.name;
    existingProfessional.birthdate = request.birthdate;
    existingProfessional.status = request.status;

    return this.repository.update(existingProfessional);
  }

  public async validate(request: UpdateProfessionalDTO) {
    if (isAfter(request.birthdate, new Date())) {
      throw new AppError('Birthdate must be in the past.');
    }
  }
}
