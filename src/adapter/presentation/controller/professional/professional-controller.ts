import { Request, Response } from 'express';

export default class ProfessionalController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.status(200);
  }
}
