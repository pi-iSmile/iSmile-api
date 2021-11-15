import IProfessionalRepository from '../../../usecase/patient/repository/patient-repository';
import { ProfessionalEntity } from '../../../entity/professional/professional.entity';
import { getRepository, Repository } from 'typeorm';


export class FakeProfessioanl implements IProfessionalRepository {
    private prfessionals: ProfessionalEntity[] = [];

    private id = 0;

    public async create(request: ProfessionalEntity): Promise<ProfessionalEntity> {
        request.id = this.id;        
        this.prfessionals.push(request);
        return request;
      }
  
      public async findAll(): Promise<ProfessionalEntity[]> {
        return this.prfessionals;
      }
  
      public async findByEmail(email: string): Promise<ProfessionalEntity | undefined> {
        return this.prfessionals.find((p) => p.email == email);
      }
  
      public async findById(id: number): Promise<ProfessionalEntity | undefined> {
        return this.prfessionals.find((p) => p.id == id);
      }
  
      public async update(request: ProfessionalEntity): Promise<ProfessionalEntity> {

        const index = this.prfessionals.findIndex((p) => p.id == request.id);

        this.prfessionals[index] = request;

        return request;
      }

}