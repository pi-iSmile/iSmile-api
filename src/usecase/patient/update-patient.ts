import { inject, injectable } from 'tsyringe';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient/patient.entity';
import UpdatePatientDTO from '../../adapter/presentation/controller/patient/dto/update-patient-dto';

@injectable()
export default class UpdatePatient {
  constructor(
        @inject(PatientRepository)
        private repository: PatientRepository,
  ) {}

  public async update(id: number, request: UpdatePatientDTO): Promise<PatientEntity> {
    const entity = PatientEntity.create(
      request.name,
      request.email,
      request.birthdate,
    );

    entity.id = id;

    return this.repository.update(entity);
  }
}
