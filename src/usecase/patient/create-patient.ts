import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import IPatientRepository from './repository/patient-repository';
import AppError from '../../shared/AppError';

@injectable()
export default class CreatePatient {
  constructor(
        @inject(PatientRepository)
        private repository: IPatientRepository,
  ) {
  }

  public async create(name: string, email: string, birthdate: Date): Promise<PatientEntity> {
    const request = PatientEntity.create(name, email, birthdate);
    await this.validate(request);

    return this.repository.create(request);
  }

  public async validate(request: PatientEntity) {
    if (await this.repository.findByEmail(request.email) != null) {
      throw new AppError(`Um paciente com o e-mail ${request.email} já existe.`, 422);
    }

    if (isAfter(request.birthdate, new Date())) {
      throw new AppError('Data de nascimento inválida.');
    }
  }
}
