import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PatientEntity } from '../../../../entity/patient/patient.entity';
import CreatePatient from '../../../../usecase/patient/create-patient';
import UpdatePatient from '../../../../usecase/patient/update-patient';
import GetPatient from '../../../../usecase/patient/get-patient';
import UpdatePatientDTO from './dto/update-patient-dto';

export default class PatientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, birthdate,
    } = request.body;

    const createPatient = container.resolve(CreatePatient);

    const result = await createPatient.create(PatientEntity.create(
      name,
      email,
      birthdate,
    ));

    return response.status(201).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name, email, birthdate,
    } = request.body;

    const { id } = request.params;

    const updatePatient = container.resolve(UpdatePatient);

    const dto = new UpdatePatientDTO(name, email, birthdate);

    const result = await updatePatient.update(id, entity);

    return response.status(201).json(result);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPatient = container.resolve(GetPatient);

    const result = await getPatient.findById(id);

    return response.status(200).json(result);
  }
}
