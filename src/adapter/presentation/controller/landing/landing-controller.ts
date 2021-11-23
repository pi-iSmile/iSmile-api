import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Scheduler } from '@ssense/sscheduler';
import GetProfessional from '../../../../usecase/professional/get-professional';
import GetAppointment from '../../../../usecase/appointment/get-appointment';

export default class LandingController {
  public async getAllProfessionals(request: Request, response: Response): Promise<Response> {
    const getProfessional = container.resolve(GetProfessional);

    const result = await getProfessional.findAll();

    const professionalResponse = result.map((professional) => ({
      id: professional.id,
      name: professional.name,
      email: professional.email,
    }));

    return response.status(200).json(professionalResponse);
  }

  public async getAvailableHours(request: Request, response: Response): Promise<Response> {
    const id = parseInt(<string>request.query.professional_id);
    const getAppointment = container.resolve(GetAppointment);
    const result = await getAppointment.findAllAppointmentsByProfessionalId(id);

    const dates = result.map((appointment) => ({
      from: appointment.date.toISOString(),
      duration: 60,
    }));

    const today = new Date();

    const scheduler = new Scheduler();
    const availability = scheduler.getAvailability({
      from: today.toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth() + 1).toISOString().split('T')[0],
      duration: 60,
      interval: 60,
      schedule: {
        weekdays: {
          from: '08:00', to: '19:00',
        },
        allocated: dates,
      },
    });

    return response.status(200).json(availability);
  }
}
