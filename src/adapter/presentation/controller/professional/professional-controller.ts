import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfessionalEntity } from '../../../../entity/professional.entity';
import CreateProfessional from '../../../../usecase/professional/create-professional';

export default class ProfessionalController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, password, birthdate,
    } = request.body;

    const createProfessional = container.resolve(CreateProfessional);

    const result = await createProfessional.create(ProfessionalEntity.create(
      name,
      email,
      birthdate,
      password,
    ));

    return response.status(201).json(result);
  }
}
