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
    const professional = await this.repository.findById(id);
    if (!professional) {
      throw new AppError(`Um profissional com o id ${id} não existe.`, 404);
    }
    return professional;
  }

  public async findByEmail(email: string): Promise<ProfessionalEntity> {
    const professional = await this.repository.findByEmail(email);
    if (!professional) {
      throw new AppError(`Um profissional com o e-mail ${email} não existe.`, 404);
    }
    return professional;
  }

  public async findAll(): Promise<ProfessionalEntity[]> {
    const professional = await this.repository.findAll();
    if (!professional) {
      throw new AppError('Não existe nenhum profissional cadastrado.', 404);
    }
    return professional;
  }
}
