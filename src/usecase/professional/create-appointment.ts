import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';

export default class CreateProfessional {
    private repository: ProfessionalRepository

    constructor(repository: ProfessionalRepository) {
      this.repository = repository;
    }

    public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
      return this.repository.create(request);
    }
}
