import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import AppError from '../../shared/AppError';
import IPatientRepository from './repository/patient-repository';

@injectable()
export default class UpdatePatient {
  constructor(
        @inject(PatientRepository)
        private repository: IPatientRepository,
  ) {
  }

  public async update(id: number, name: string, email: string, birthdate: Date): Promise<PatientEntity> {
    const existingPatient = await this.repository.findById(id);
    if (!existingPatient) {
      throw new AppError(`Paciente com ID: ${id} não existe.`, 404);
    }

    await this.validateDate(birthdate);

    existingPatient.name = name;
    existingPatient.email = email;
    existingPatient.birthdate = birthdate;

    return this.repository.update(existingPatient);
  }

  public async validateDate(birthdate: Date) {
    if (isAfter(birthdate, new Date())) {
      throw new AppError('Data de nascimento inválida.');
    }
  }
}
