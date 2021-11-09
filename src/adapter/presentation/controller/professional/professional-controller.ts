import { Request, Response } from 'express';
import CreateProfessional from '../../../../usecase/professional/create-appointment';
import { ProfessionalEntity } from '../../../../entity/professional/professional.entity';

export default class ProfessionalController {
    private createProfessional: CreateProfessional

    constructor(createProfessional: CreateProfessional) {
      this.createProfessional = createProfessional;
    }

    public async create(request: Request, response: Response): Promise<Response> {
      const {
        name, email, password, birthdate,
      } = request.body;

      const result = await this.createProfessional.create(ProfessionalEntity.create(
        name,
        email,
        birthdate,
        password,
      ));

      return response.status(201).json(result);
    }
}
