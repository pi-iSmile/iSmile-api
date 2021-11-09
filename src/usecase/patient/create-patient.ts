import { inject, injectable } from 'tsyringe';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';

@injectable()
export default class CreatePatient {
  constructor(
        @inject(PatientRepository)
        private repository: PatientRepository,
  ) {}

  public async create(request: PatientEntity): Promise<PatientEntity> {
    return this.repository.create(request);
  }
}
