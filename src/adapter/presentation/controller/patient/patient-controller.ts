import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePatient from '../../../../usecase/patient/create-patient';
import UpdatePatient from '../../../../usecase/patient/update-patient';
import GetPatient from '../../../../usecase/patient/get-patient';
import GetProfessional from '../../../../usecase/professional/get-professional';
import { ProfessionalStatus } from '../../../../entity/professional/professional-status';

export default class PatientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, birthdate } = request.body;

    const createPatient = container.resolve(CreatePatient);

    const result = await createPatient.create(name, email, birthdate);

    const objectResponse = {
      id: result.id,
      email: result.email,
      name: result.name,
      birthdate: result.birthdate,
      updatedAt: result.updatedAt,
    };

    return response.status(201).json(objectResponse);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, birthdate } = request.body;

    const updatePatient = container.resolve(UpdatePatient);

    const { id } = request.params;

    const result = await updatePatient.update(parseInt(id, 10), name, email, birthdate);

    const objectResponse = {
      id: result.id,
      email: result.email,
      name: result.name,
      birthdate: result.birthdate,
      updatedAt: result.updatedAt,
    };

    return response.status(201).json(objectResponse);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPatient = container.resolve(GetPatient);

    const result = await getPatient.findById(parseInt(id, 10));

    const objectResponse = {
      id: result.id,
      email: result.email,
      name: result.name,
      birthdate: result.birthdate,
      updatedAt: result.updatedAt,
    };

    return response.status(200).json(objectResponse);
  }

  public async findByEmail(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const getPatient = container.resolve(GetPatient);

    const result = await getPatient.findByEmail(email as string);

    const object = {
      id: result.id,
      name: result.name,
      email: result.email,
      birthdate: result.birthdate,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return response.status(200).json(object);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const getPatient = container.resolve(GetPatient);

    const result = await getPatient.findAll();

    const patientResponse = result.map((patient) => ({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      birthdate: patient.birthdate,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    }));

    return response.status(200).json(patientResponse);
  }
}
