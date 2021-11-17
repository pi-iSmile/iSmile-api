import { getHours, isBefore, startOfHour } from 'date-fns';

import { inject, injectable } from 'tsyringe';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import AppError from '../../shared/AppError';
import IAppointmentRepository from './repository/appointment-repository';

@injectable()
export default class UpdateAppointment {
  constructor(
        @inject(AppointmentRepository)
        private appointmentRepository: IAppointmentRepository,
  ) {
  }

  public async update(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    return await this.appointmentRepository.update(appointment);
  }
}
