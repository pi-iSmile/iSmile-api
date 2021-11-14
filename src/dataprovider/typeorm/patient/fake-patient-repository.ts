import { PatientEntity } from '../../../entity/patient/patient.entity';
import IPatientRepository from '../../../usecase/patient/repository/patient-repository';

export class FakePatientRepository implements IPatientRepository {
    private patients: PatientEntity[] = [];

    private id = 0

    public async create(request: PatientEntity): Promise<PatientEntity> {
      request.id = this.id;
      this.patients.push(request);
      return request;
    }

    public async findAll(): Promise<PatientEntity[]> {
      return this.patients;
    }

    public async findByEmail(email: string): Promise<PatientEntity | undefined> {
      return this.patients.find((p) => p.email === email);
    }

    public async findById(id: number): Promise<PatientEntity | undefined> {
      return this.patients.find((p) => p.id === id);
    }

    public async update(request: PatientEntity): Promise<PatientEntity> {
      const findIndex = this.patients.findIndex((p) => p.id === request.id);

      this.patients[findIndex] = request;

      return request;
    }
}
