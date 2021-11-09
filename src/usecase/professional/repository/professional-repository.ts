import { ProfessionalEntity } from '../../../entity/professional.entity';

export default interface IProfessionalRepository {
    create(request: ProfessionalEntity): Promise<ProfessionalEntity>;
    update(request: ProfessionalEntity): Promise<ProfessionalEntity>;
    findById(id: number): Promise<ProfessionalEntity | undefined>;
    findByEmail(email: string): Promise<ProfessionalEntity | undefined>;
    findAll(): Promise<ProfessionalEntity[]>;
}
