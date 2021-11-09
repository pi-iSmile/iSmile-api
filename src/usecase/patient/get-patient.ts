import { inject, injectable } from 'tsyringe';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import AppError from '../../shared/AppError';

@injectable()
export default class GetPatient {
  constructor(
        @inject(PatientRepository)
        private repository: PatientRepository,
  ) {}

  public async findById(id: number): Promise<PatientEntity> {
    const patient = await this.repository.findById(id);
    if (!patient) {
      throw new AppError('Patient does not exist.');
    }
    return patient;
  }
}
