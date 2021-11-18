import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePatient from '../../../../usecase/patient/create-patient';
import UpdatePatient from '../../../../usecase/patient/update-patient';
import GetPatient from '../../../../usecase/patient/get-patient';

export default class PatientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, birthdate } = request.body;

    const createPatient = container.resolve(CreatePatient);

    const result = await createPatient.create(name, email, birthdate);

    return response.status(201).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, birthdate } = request.body;

    const updatePatient = container.resolve(UpdatePatient);

    const { id } = request.params;

    const result = await updatePatient.update(parseInt(id, 10), name, email, birthdate);

    return response.status(201).json(result);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPatient = container.resolve(GetPatient);

    const result = await getPatient.findById(parseInt(id, 10));

    return response.status(200).json(result);
  }
}
