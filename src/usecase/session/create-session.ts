import { inject, injectable } from 'tsyringe';
import { hashSync, compareSync } from 'bcryptjs';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import IProfessionalRepository from '../professional/repository/professional-repository';
import AppError from '../../shared/AppError';
import 'dotenv/config';
import Session from './session';
import { sign } from 'jsonwebtoken';
import auth from '../../shared/config/auth';

@injectable()
export default class CreateSession {
  constructor(
        @inject(ProfessionalRepository)
        private repository: IProfessionalRepository,
  ) {
  }

  public async login(professionalEmail: string, professionalPassword: string): Promise<Session> {
    const { secret } = auth.jwt;

    const professional = await this.repository.findByEmail(professionalEmail);

    if (professional == null) {
      throw new AppError('Credenciais inválidas.', 403);
    }

    if (!compareSync(professionalPassword, professional.password)) {
      throw new AppError('Credenciais inválidas.', 403);
    }

    const token = sign({}, secret, { subject: professional.email });

    return new Session(token, professional);
  }
}
