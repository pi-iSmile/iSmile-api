import { getRepository, Repository } from 'typeorm';
import IProfessionalRepository from '../../../usecase/patient/repository/patient-repository';
import { ProfessionalEntity } from '../../../entity/professional/professional.entity';

class ProfessionalRepository implements IProfessionalRepository {
    private repository: Repository<ProfessionalEntity>

    constructor() {
      this.repository = getRepository(ProfessionalEntity);
    }

    public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
      const user = await this.repository.create(request);

      await this.repository.save(user);

      return user;
    }

    public async findAll(): Promise<ProfessionalEntity[]> {
      const professionals = await this.repository.find();

      return professionals;
    }

    public async findByEmail(email: string): Promise<ProfessionalEntity | undefined> {
      const patient = await this.repository.findOne({
        where: { email },
      });

      return patient;
    }

    public async findById(id: number): Promise<ProfessionalEntity | undefined> {
      const patient = await this.repository.findOne(id);

      return patient;
    }

    public async update(request: ProfessionalEntity): Promise<ProfessionalEntity> {
      return this.repository.save(request);
    }
}

export default ProfessionalRepository;
