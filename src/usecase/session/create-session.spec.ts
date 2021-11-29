import { create } from 'domain';
import IAppointmentRepository from '../appointment/repository/appointment-repository';
import IProfessionalRepository from '../professional/repository/professional-repository';
import CreateSession from './create-session';
import { FakeProfessionalRepository } from '../../dataprovider/typeorm/professional/fake-professional-repository';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';
import CreateProfessional from '../professional/create-professional';
import AppError from '../../shared/AppError';

let repository: IProfessionalRepository;
let createProfessional: CreateProfessional;
let underTest: CreateSession;

describe('CreateSession', () => {
  beforeEach(() => {
    repository = new FakeProfessionalRepository();
    createProfessional = new CreateProfessional(repository);
    underTest = new CreateSession(repository);
  });
  it('Should return user session', async () => {
    const professional = await createProfessional.create('name', 'email@gmail.com', '1234', new Date());

    const result = await underTest.login(professional.email, '1234');

    expect(result.professional).toBe(professional);
    expect(result.token).not.toBeNull();
  });

  it('Should throw exception if user does not exist', async () => {
    await expect(underTest.login('dummy@email.com', '1234')).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw exception if password is incorrect', async () => {
    const professional = await createProfessional.create('name', 'email@gmail.com', '1234', new Date());

    await expect(underTest.login(professional.email, '4321')).rejects.toBeInstanceOf(AppError);
  });
});
