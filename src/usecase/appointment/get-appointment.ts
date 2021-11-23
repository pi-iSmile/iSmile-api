import { container, inject, injectable } from 'tsyringe';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import AppError from '../../shared/AppError';
import IAppointmentRepository from './repository/appointment-repository';
import GetProfessional from '../professional/get-professional';

@injectable()
export default class GetAppointment {
  constructor(
        @inject(AppointmentRepository)
        private appointmentRepository: IAppointmentRepository,
  ) {
  }

  public async findByAppointmentIdAndEmail(id: number, email: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findByIdAndProfessionalEmail(id, email);
    if (!appointment) {
      throw new AppError(`Agendamento com o id ${id} não existe.`, 404);
    }
    return appointment;
  }

  public async findAllByLoggedUser(email: string): Promise<AppointmentEntity[]> {
    const getProfessional = container.resolve(GetProfessional);

    const professional = await getProfessional.findByEmail(email);

    const appointment = await this.appointmentRepository.findAllByProfessionalId(professional.id);
    if (!appointment) {
      throw new AppError(`Agendamentos associados ao profissional de id: ${professional.id} não existe.`, 404);
    }

    return appointment;
  }

  public async findAllAppointmentsByProfessionalId(id: number): Promise<AppointmentEntity[]> {
    return await this.appointmentRepository.findAllByProfessionalId(id);
  }
}
