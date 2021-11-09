import { ProfessionalStatus } from '../../../../../entity/professional/professional-status';

export default class UpdateProfessionalDTO {
  constructor(name: string = '', status: ProfessionalStatus = ProfessionalStatus.ENABLED, birthdate: Date = new Date()) {
    this.name = name;
    this.status = status;
    this.birthdate = birthdate;
  }

    public name: string

    public status: ProfessionalStatus

    public birthdate: Date
}
