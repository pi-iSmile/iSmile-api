import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProfessional from '../../../../usecase/professional/create-professional';
import UpdateProfessional from '../../../../usecase/professional/update-professional';
import UpdateProfessionalPassword from '../../../../usecase/professional/update-professional-password';
import { ProfessionalStatus } from '../../../../entity/professional/professional-status';

export default class ProfessionalController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, password, birthdate,
    } = request.body;

    const createProfessional = container.resolve(CreateProfessional);

    const result = await createProfessional.create(name, email, password, birthdate);

    return response.status(201).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, birthdate } = request.body;
    let { status } = request.body;
    const { id } = request.params;

    status = ProfessionalStatus[status as keyof typeof ProfessionalStatus];

    const updateProfessional = container.resolve(UpdateProfessional);

    const result = await updateProfessional.update(parseInt(id, 10), name, status, birthdate);

    return response.status(200).json(result);
  }

  public async updatePassword(request: Request, response: Response): Promise<Response> {
    const { oldPassword, newPassword } = request.body;
    const { id } = request.params;

    const updateProfessionalPassword = container.resolve(UpdateProfessionalPassword);

    const result = await updateProfessionalPassword.updatePassword(parseInt(id, 10), oldPassword, newPassword);

    return response.status(200).json(result);
  }
}
