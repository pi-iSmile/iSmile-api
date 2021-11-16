import { da } from 'date-fns/locale';
import { AppointmentEntity } from 'entity/appointment/appointment.entity';
import { Request, Response } from 'express';
import { Logger } from 'tslog';
import { container } from 'tsyringe';
import CreateAppointment from 'usecase/appointment/create-appointment';
import GetAppointment from 'usecase/appointment/get-appointment';
import UpdateAppointment from 'usecase/appointment/update-appointment';
import GetPatient from 'usecase/patient/get-patient';
import GetProfessional from 'usecase/professional/get-professional';
import AppError from '../../../../shared/AppError';

const log: Logger = new Logger();

export default class AppointmentController {

  public async create(request: Request, response: Response): Promise<Response> {

    const {
      date, status, patientId, professinalId
    } = request.body;

    const patientEntity = await container.resolve(GetPatient).findById(parseInt(patientId));

    const professinalEntity = await container.resolve(GetProfessional).findById(parseInt(professinalId));

    const createAppointment = container.resolve(CreateAppointment);

    const result = await createAppointment.create(AppointmentEntity.create(date,
      status,
      patientEntity,
      professinalEntity));

    return response.status(201).json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const {
      date, status
    } = request.body;

    const {
      id
    } = request.params;

    const appointmentEntity = await container.resolve(GetAppointment).findById(parseInt(id))

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
