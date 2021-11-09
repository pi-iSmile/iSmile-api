import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Logger } from 'tslog';
import { PatientEntity } from '../../../entity/patient/patient.entity';
import IPatientRepository from '../../../usecase/patient/repository/patient-repository';

const log: Logger = new Logger();

@EntityRepository(PatientEntity)
class PatientRepository implements IPatientRepository {
    private repository: Repository<PatientEntity>

    constructor() {
      log.info('get repository');
      this.repository = getRepository(PatientEntity);
    }

    public async create(request: PatientEntity): Promise<PatientEntity> {
      const user = await this.repository.create(request);

      await this.repository.save(user);

      return user;
    }

    public async findAll(): Promise<PatientEntity[]> {
      const patients = await this.repository.find();

      return patients;
    }

    public async findByEmail(email: string): Promise<PatientEntity | undefined> {
      const patient = await this.repository.findOne({
        where: { email },
      });

      return patient;
    }

    public async findById(id: number): Promise<PatientEntity | undefined> {
      const patient = await this.repository.findOne(id);

      return patient;
    }

    public async update(request: PatientEntity): Promise<PatientEntity> {
      return this.repository.save(request);
    }
}

export default PatientRepository;
