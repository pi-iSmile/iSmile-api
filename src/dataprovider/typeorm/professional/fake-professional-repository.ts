import { ProfessionalEntity } from '../../../entity/professional/professional.entity';
import IProfessionalRepository from '../../../usecase/professional/repository/professional-repository';

export class FakeProfessionalRepository implements IProfessionalRepository {
    private professionals: ProfessionalEntity[] = [];

    private id = 1;

    public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
      request.id = this.id;
      this.professionals.push(request);
      this.id++;
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

    public async findByEmailAndPassword(email: string, password: string): Promise<ProfessionalEntity | undefined> {
      return this.professionals.find((p) => p.email === email && p.password === password);
    }
}
