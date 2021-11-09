import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import { PatientEntity } from '../../entity/patient.entity';

export default class CreatePatient {
    private repository: PatientRepository

    constructor(repository: PatientRepository) {
      this.repository = repository;
    }

    public async create(request: PatientEntity): Promise<PatientEntity> {
      return this.repository.create(request);
    }
}
