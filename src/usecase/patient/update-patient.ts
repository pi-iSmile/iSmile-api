import { inject, injectable } from 'tsyringe';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import UpdatePatientDTO from '../../adapter/presentation/controller/patient/dto/update-patient-dto';
import AppError from '../../shared/AppError';
import IPatientRepository from './repository/patient-repository';

@injectable()
export default class UpdatePatient {
  constructor(
        @inject(PatientRepository)
        private repository: IPatientRepository,
  ) {
  }

  public async update(id: number, request: UpdatePatientDTO): Promise<PatientEntity> {
    const existingPatient = await this.repository.findById(id);
    if (!existingPatient) {
      throw new AppError('Patient does not exist');
    }

    existingPatient.name = request.name;
    existingPatient.birthdate = request.birthdate;
    existingPatient.email = request.email;

    return this.repository.update(existingPatient);
  }
}
