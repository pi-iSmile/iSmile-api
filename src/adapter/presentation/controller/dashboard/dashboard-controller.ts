import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppointmentStatus } from '../../../../entity/appointment/appointment-status';
import GetAppointment from '../../../../usecase/appointment/get-appointment';

export default class DashboardController {
  public async getAppointments(request: Request, response: Response): Promise<Response> {
    const {
      initialDate, finalDate, status, patientEmail, professionalEmail,
    } = request.query;

    const getAppointment = container.resolve(GetAppointment);

    const appointmentList = await getAppointment.findAllToDashboard(
      professionalEmail ? professionalEmail.toString() : null,
      patientEmail ? patientEmail.toString() : null,
      status ? AppointmentStatus[status as keyof typeof AppointmentStatus] : null,
      initialDate ? new Date(Date.parse(initialDate as string)) : null,
      finalDate ? new Date(Date.parse(finalDate as string)) : null,
    );

    const responseList = appointmentList.map((appointment) => ({
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
    }));

    return response.status(201).json(responseList);
  }
}
