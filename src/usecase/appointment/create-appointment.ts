import {
  getHours, getMinutes, getSeconds, isBefore, startOfHour,
} from 'date-fns';

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
import { AppointmentStatus } from '../../entity/appointment/appointment-status';
import { PatientEntity } from '../../entity/patient/patient.entity';

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

  public async create(date: Date, professionalEmail: string, patientEmail: string): Promise<AppointmentEntity> {
    if (getMinutes(date) !== 0 || getSeconds(date) !== 0) {
      throw new AppError('Você somente pode marcar horários em ponto. Exemplo: 13:00, 14:00, 15:00, etc.');
    }

    const appointmentDate = startOfHour(date);

    const professional = await this.professionalRepository.findByEmail(professionalEmail);
    if (professional == null) {
      throw new AppError(`Um profissional com o e-mail ${professionalEmail} não existe.`, 404);
    }

    const patient = await this.patientRepository.findByEmail(patientEmail);
    if (patient == null) {
      throw new AppError(`Um paciente com o e-mail ${patientEmail} não existe.`, 404);
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Você não pode agendar com uma data que ja passou.', 422);
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError('Só é possível agendar entre 08:00 e 18:00.', 422);
    }

    if (await this.professionalAlreadyHasAppointment(professional, appointmentDate)) {
      throw new AppError('Já existe um outro agendamento neste horário para este profissional.', 422);
    }

    if (await this.patientAlreadyHasAppointment(patient, appointmentDate)) {
      throw new AppError('Já existe um outro agendamento neste horário para este paciente.', 422);
    }

    const appointment = AppointmentEntity.create(date, AppointmentStatus.PENDING, patient, professional);

    return await this.appointmentRepository.create(appointment);
  }

  public async professionalAlreadyHasAppointment(professional: ProfessionalEntity, date: Date) {
    const appointment = await this.appointmentRepository.findByDateAndProfessionalEmail(date, professional.email);

    return appointment != null;
  }

  public async patientAlreadyHasAppointment(patient: PatientEntity, date: Date) {
    const appointment = await this.appointmentRepository.findByDateAndPatientEmail(date, patient.email);

    return appointment != null;
  }
}
