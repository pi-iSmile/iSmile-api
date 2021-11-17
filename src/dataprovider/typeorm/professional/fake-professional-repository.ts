import IProfessionalRepository from '../../../usecase/patient/repository/patient-repository';
import { ProfessionalEntity } from '../../../entity/professional/professional.entity';

export class FakeProfessionalRepository implements IProfessionalRepository {
    private professionals: ProfessionalEntity[] = [];

    private id = 0;

    public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
      request.id = this.id;
      this.professionals.push(request);
      return request;
    }

    public async findAll(): Promise<ProfessionalEntity[]> {
      return this.professionals;
    }

    public async findByEmail(email: string): Promise<ProfessionalEntity | undefined> {
      return this.professionals.find((p) => p.email === email);
    }

    public async findById(id: number): Promise<ProfessionalEntity | undefined> {
      return this.professionals.find((p) => p.id === id);
    }

    public async update(request: ProfessionalEntity): Promise<ProfessionalEntity> {
      const index = this.professionals.findIndex((p) => p.id === request.id);

      this.professionals[index] = request;

      return request;
    }
}
