import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointment from '../../../../usecase/appointment/create-appointment';
import { AppointmentStatus } from '../../../../entity/appointment/appointment-status';
import UpdateAppointment from '../../../../usecase/appointment/update-appointment';
import { AuthRequest } from '../../../../../@types/express';
import GetAppointment from '../../../../usecase/appointment/get-appointment';

export default class DashboardController {
  public async getAppointments(request: Request, response: Response): Promise<Response> {
    const {
      intialDate, finalDate, status, clientEmail, professionalEmail,
    } = request.body;

    const getAppointment = container.resolve(GetAppointment);

    const appointmentList = await getAppointment.findAllToDashboard(professionalEmail, clientEmail, status, intialDate, finalDate);

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
}
