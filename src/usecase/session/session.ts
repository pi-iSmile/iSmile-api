import { ProfessionalEntity } from '../../entity/professional/professional.entity';

export default class Session {
  constructor(token: string, professional: ProfessionalEntity) {
    this.token = token;
    this.professional = professional;
  }

    public token: string;

    public professional: ProfessionalEntity
}
