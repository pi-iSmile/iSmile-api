import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import { hashSync } from 'bcryptjs';
import auth from '../../shared/config/auth';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import IProfessionalRepository from './repository/professional-repository';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import AppError from '../../shared/AppError';

@injectable()
export default class CreateProfessional {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async create(name: string, email: string, password: string, birthdate: Date): Promise<ProfessionalEntity> {
    const encryptedPassword = hashSync(password, 8);
    const request = ProfessionalEntity.create(name, email, birthdate, encryptedPassword);

    await this.validate(request);

    return this.repository.create(request);
  }

  public async validate(request: ProfessionalEntity) {
    if (await this.repository.findByEmail(request.email) != null) {
      throw new AppError(`Um profissional com o e-mail ${request.email} já existe.`, 422);
    }

    if (isAfter(request.birthdate, new Date())) {
      throw new AppError('Data de nascimento inválida.');
    }
  }
}
