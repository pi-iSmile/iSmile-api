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
import CreateAppointmentDto from '../../adapter/presentation/controller/appointment/dto/create-appointment-dto';
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

  public async create(request: CreateAppointmentDto): Promise<AppointmentEntity> {
    if (getMinutes(request.date) !== 0 || getSeconds(request.date) !== 0) {
      throw new AppError('Você somente pode marcar horários em ponto. Exemplo: 13:00, 14:00, 15:00, etc.');
    }

    const appointmentDate = startOfHour(request.date);

    const professional = await this.professionalRepository.findByEmail(request.professionalEmail);
    if (professional == null) {
      throw new AppError('Profissional com este e-mail não existe.');
    }

    const patient = await this.patientRepository.findByEmail(request.patientEmail);
    if (patient == null) {
      throw new AppError('Paciente com este e-mail não existe.');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Você não pode agendar com uma data que ja passou.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError('Só é possível agendar entre 08:00 e 18:00.');
    }

    if (await this.professionalAlreadyHasAppointment(professional, appointmentDate)) {
      throw new AppError('Já existe um outro agendamento neste horário para este profissional.');
    }

    if (await this.patientAlreadyHasAppointment(patient, appointmentDate)) {
      throw new AppError('Já existe um outro agendamento neste horário para este paciente.');
    }

    const appointment = AppointmentEntity.create(request.date, AppointmentStatus.PENDING, patient, professional);

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
