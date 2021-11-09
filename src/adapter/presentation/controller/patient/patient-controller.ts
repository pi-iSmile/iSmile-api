import { Request, Response } from 'express';

export default class PatientController {
  public async create(request: Request, response: Response): Promise<Response> {
    // const patient = container.resolve(CreatePatient);
    return response.json('');
  }
}
