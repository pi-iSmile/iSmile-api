import { inject, injectable } from 'tsyringe';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import AppError from '../../shared/AppError';
import IPatientRepository from './repository/patient-repository';

@injectable()
export default class GetPatient {
  constructor(
        @inject(PatientRepository)
        private repository: IPatientRepository,
  ) {
  }

  public async findById(id: number): Promise<PatientEntity> {
    const patient = await this.repository.findById(id);
    if (!patient) {
      throw new AppError(`Paciente com ID: ${id} não existe.`, 404);
    }
    return patient;
  }
}
