import { inject, injectable } from 'tsyringe';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import AppError from '../../shared/AppError';
import IPatientRepository from './repository/patient-repository';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';

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

  public async findByEmail(email: string): Promise<PatientEntity> {
    const patient = await this.repository.findByEmail(email);
    if (!patient) {
      throw new AppError(`Um Paciente com o e-mail ${email} não existe.`, 404);
    }
    return patient;
  }

  public async findAll(): Promise<PatientEntity[]> {
    const patient = await this.repository.findAll();
    if (!patient) {
      throw new AppError('Não existe nenhum paciente cadastrado.', 404);
    }
    return patient;
  }
}
