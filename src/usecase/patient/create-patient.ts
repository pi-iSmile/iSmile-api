import { inject, injectable } from 'tsyringe';
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

  public async create(request: PatientEntity): Promise<PatientEntity> {
    await this.validate(request);

    return this.repository.create(request);
  }

  public async validate(request: PatientEntity) {
    if (await this.repository.findByEmail(request.email) != null) {
      throw new AppError('Patient with this e-mail already exists.');
    }
  }
}
