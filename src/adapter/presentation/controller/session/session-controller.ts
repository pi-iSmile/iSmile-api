import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateSession from '../../../../usecase/session/create-session';
import { ProfessionalStatus } from '../../../../entity/professional/professional-status';

export default class SessionController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const session = container.resolve(CreateSession);

    const result = await session.login(email, password);

    const object = {
      token: result.token,
      professional: {
        id: result.professional.id,
        name: result.professional.name,
        email: result.professional.email,
      },
    };

    return response.status(200).json(object);
  }
}
