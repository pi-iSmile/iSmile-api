import { getHours, isBefore, startOfHour } from 'date-fns';

import { inject, injectable } from 'tsyringe';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';
import IAppointmentRepository from './repository/appointment-repository';
import IPatientRepository from '../patient/repository/patient-repository';
import IProfessionalRepository from '../professional/repository/professional-repository';
import { ProfessionalEntity } from '../../entity/professional/professional.entity';

@injectable()
export default class CreateAppointment {
  constructor(
        @inject(AppointmentRepository)
        private appointmentRepository: IAppointmentRepository,
        @inject(PatientRepository)
        private patientRepository: IPatientRepository,
        @inject(ProfessionalRepository)
        private professionalRepository: IProfessionalRepository,
  ) {
  }

  public async create(request: AppointmentEntity): Promise<AppointmentEntity> {
    const appointmentDate = startOfHour(request.date);

    const professional = await this.professionalRepository.findById(request.professional.id);
    if (professional == null) {
      throw new AppError('ProfessionalEntity does not exist');
    }

    const patient = await this.patientRepository.findById(request.patient.id);
    if (patient == null) {
      throw new AppError('PatientEntity does not exist');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment in past');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError('You can only create an appointment between 08:00 and 18:00');
    }

    if (await this.hasAppointmentInSameHour(professional, appointmentDate)) {
      throw new AppError('There is already an appointment on this date');
    }

    return this.appointmentRepository.create(request);
  }

  public async hasAppointmentInSameHour(professional: ProfessionalEntity, date: Date) {
    const oneHourLater = new Date(date);
    oneHourLater.setHours(date.getHours() + 1);
    const appointment = this.appointmentRepository.findByDateBetweenAndProfessionalId(date, oneHourLater, professional.id);

    return appointment != null;
  }
}
