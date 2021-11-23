import { inject, injectable } from 'tsyringe';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import AppError from '../../shared/AppError';
import IAppointmentRepository from './repository/appointment-repository';
import { AppointmentStatus } from '../../entity/appointment/appointment-status';

@injectable()
export default class UpdateAppointment {
  constructor(
        @inject(AppointmentRepository)
        private appointmentRepository: IAppointmentRepository,
  ) {
  }

  public async updateStatus(id: number, status: AppointmentStatus): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError(`Agendamento com o ${id} não existe.`, 404);
    }

    if (appointment.status === AppointmentStatus.CANCELED || appointment.status === AppointmentStatus.FINISHED || appointment.status === AppointmentStatus.EXPIRED) {
      throw new AppError(`Agendamento com o ${id} já foi processado!`, 422);
    }

    if (status === appointment.status) {
      throw new AppError(`Agendamento com o ${id} já está com o status ${AppointmentStatus[status]}!`, 422);
    }

    appointment.status = status;

    const result = await this.appointmentRepository.update(appointment);

    return result;
  }
}
