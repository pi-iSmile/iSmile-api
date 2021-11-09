import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfessionalEntity } from '../../../../entity/professional/professional.entity';
import CreateProfessional from '../../../../usecase/professional/create-professional';
import UpdateProfessional from '../../../../usecase/professional/update-professional';
import UpdateProfessionalDTO from './dto/update-professional-dto';
import UpdateProfessionalPasswordDTO from './dto/update-professional-password-d-t-o';
import UpdateProfessionalPassword from '../../../../usecase/professional/update-professional-password';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, status, birthdate } = request.body;

    const { id } = request.params;

    const updateProfessional = container.resolve(UpdateProfessional);

    const professional = new UpdateProfessionalDTO(
      name,
      status,
      birthdate,
    );

    const result = await updateProfessional.update(parseInt(id), professional);

    return response.status(200).json(result);
  }

  public async updatePassword(request: Request, response: Response): Promise<Response> {
    const { old_password, new_password } = request.body;

    const { id } = request.params;

    const updateProfessional = container.resolve(UpdateProfessionalPassword);

    const professional = new UpdateProfessionalPasswordDTO(
      old_password, new_password,
    );

    const result = await updateProfessional.updatePassword(parseInt(id), professional);

    return response.status(200).json(result);
  }
}
