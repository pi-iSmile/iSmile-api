import { inject, injectable } from 'tsyringe';
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
      throw new AppError('Appointment does not exist.');
    }
    return appointment;
  }
}
