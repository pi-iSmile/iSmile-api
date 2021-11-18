import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointment from '../../../../usecase/appointment/create-appointment';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { professionalEmail, patientEmail, date } = request.body;

    const createAppointment = container.resolve(CreateAppointment);

    const result = await createAppointment.create(professionalEmail, patientEmail, date);

    return response.status(201).json(result);
  }
}
