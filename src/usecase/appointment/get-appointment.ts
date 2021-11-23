import { container, inject, injectable } from 'tsyringe';
import GetProfessional from 'usecase/professional/get-professional';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import AppError from '../../shared/AppError';
import IAppointmentRepository from './repository/appointment-repository';

@injectable()
export default class GetAppointment {
  constructor(
        @inject(AppointmentRepository)
        private appointmentRepository: IAppointmentRepository,
  ) {
  }

  public async findById(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError(`Agendamento com o ${id} não existe.`, 404);
    }
    return appointment;
  }

  public async findAllByLoggedUser(email: string): Promise<AppointmentEntity[]> {
    const getProfessional = container.resolve(GetProfessional);

    const professional = await getProfessional.findByEmail(email)

    const appointment = await this.appointmentRepository.findAllByProfessionalId(professional.id);
    if (!appointment) {
      throw new AppError(`Agendamentos associados ao profissional de id: ${professional.id} não existe.`, 404);
    }

    return appointment;
  }
}
