import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointment from '../../../../usecase/appointment/create-appointment';
import { AppointmentStatus } from '../../../../entity/appointment/appointment-status';
import UpdateAppointment from '../../../../usecase/appointment/update-appointment';
import { AuthRequest } from '../../../../../@types/express';
import GetAppointment from 'usecase/appointment/get-appointment';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { professionalEmail, patientEmail, date } = request.body;

    const createAppointment = container.resolve(CreateAppointment);

    const result = await createAppointment.create(date, professionalEmail, patientEmail);

    const object = {
      id: result.id,
      status: AppointmentStatus[result.status],
      date: result.date,
      professional: {
        id: result.professional.id,
        name: result.professional.name,
        email: result.professional.email,
      },
      patient: {
        id: result.patient.id,
        name: result.patient.name,
        email: result.patient.email,
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return response.status(201).json(object);
  }

  public async confirm(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateAppointment = container.resolve(UpdateAppointment);

    const result = await updateAppointment.updateStatus(parseInt(id, 10), AppointmentStatus.CONFIRMED);

    const object = {
      id: result.id,
      status: AppointmentStatus[result.status],
      date: result.date,
      professional: {
        id: result.professional.id,
        name: result.professional.name,
        email: result.professional.email,
      },
      patient: {
        id: result.patient.id,
        name: result.patient.name,
        email: result.patient.email,
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return response.status(200).json(object);
  }

  public async cancel(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateAppointment = container.resolve(UpdateAppointment);

    const result = await updateAppointment.updateStatus(parseInt(id, 10), AppointmentStatus.CANCELED);

    const object = {
      id: result.id,
      status: AppointmentStatus[result.status],
      date: result.date,
      professional: {
        id: result.professional.id,
        name: result.professional.name,
        email: result.professional.email,
      },
      patient: {
        id: result.patient.id,
        name: result.patient.name,
        email: result.patient.email,
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return response.status(200).json(object);
  }

  public async findAllByLoggedUser(request: AuthRequest, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAppointment = container.resolve(GetAppointment);

    const listOfAppointements = await getAppointment.findAllByLoggedUser(request.professional as string);

    const responseList = listOfAppointements.map(appointment => {
      return {
        id: appointment.id,
        status: AppointmentStatus[appointment.status],
        date: appointment.date,
        professional: {
          id: appointment.professional.id,
          name: appointment.professional.name,
          email: appointment.professional.email,
        },
        patient: {
          id: appointment.patient.id,
          name: appointment.patient.name,
          email: appointment.patient.email,
        },
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      };
    })

    return response.status(200).json(responseList);
  }
}
