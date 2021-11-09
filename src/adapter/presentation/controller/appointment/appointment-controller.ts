import { Request, Response } from 'express';
import { Logger } from 'tslog';
import AppError from '../../../../shared/AppError';

const log: Logger = new Logger();

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    log.info('a');
    throw new AppError('teste', 400);
    return response.json('');
  }
}
