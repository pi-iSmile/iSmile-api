import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppointmentEntity } from '../../../../entity/appointment/appointment.entity';
import GetPatient from '../../../../usecase/patient/get-patient';
import GetProfessional from '../../../../usecase/professional/get-professional';
import CreateAppointment from '../../../../usecase/appointment/create-appointment';
import GetAppointment from '../../../../usecase/appointment/get-appointment';
import UpdateAppointment from '../../../../usecase/appointment/update-appointment';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      date, status, patientId, professinalId,
    } = request.body;

    const patientEntity = await container.resolve(GetPatient).findById(parseInt(patientId));

    const professionalEntity = await container.resolve(GetProfessional).findById(parseInt(professinalId));

    const createAppointment = container.resolve(CreateAppointment);

    const result = await createAppointment.create(AppointmentEntity.create(date,
      status,
      patientEntity,
      professionalEntity));

    return response.status(201).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      date, status,
    } = request.body;

    const {
      id,
    } = request.params;

    const appointmentEntity = await container.resolve(GetAppointment).findById(parseInt(id));

    appointmentEntity.status = status;

    appointmentEntity.date = date;

    const updateAppointment = await container.resolve(UpdateAppointment);

    const result = await updateAppointment.update(appointmentEntity);

    return response.status(200).json(result);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    return response;
  }

  public async findByStatus(request: Request, response: Response): Promise<Response> {
    return response;
  }

  public async findByPatientId(request: Request, response: Response): Promise<Response> {
    return response;
  }

  public async findByProfessionalId(request: Request, response: Response): Promise<Response> {
    return response;
  }

  public async findByDateBetweenAndProfessionalId(request: Request, response: Response): Promise<Response> {
    return response;
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    return response;
  }
}
