import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateSession from '../../../../usecase/session/create-session';

export default class SessionController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const session = container.resolve(CreateSession);

    const token = await session.login(email, password);
    return response.status(200).json(token);
  }
}
