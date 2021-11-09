import { isBefore, startOfHour } from 'date-fns';

import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment.entity';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import AppError from '../../shared/AppError';

export default class CreateAppointment {
    private appointmentRepository: AppointmentRepository

    private patientRepository: PatientRepository

    private professionalRepository: ProfessionalRepository

    constructor(appointmentRepository: AppointmentRepository, patientRepository: PatientRepository, professionalRepository: ProfessionalRepository) {
      this.appointmentRepository = appointmentRepository;
      this.patientRepository = patientRepository;
      this.professionalRepository = professionalRepository;
    }

    public async create(request: AppointmentEntity): Promise<AppointmentEntity> {
      const appointmentDate = startOfHour(request.date);

      if (await this.professionalRepository.findById(request.professional.id) == null) {
        throw new AppError('ProfessionalEntity does not exist');
      }

      if (await this.patientRepository.findById(request.patient.id) == null) {
        throw new AppError('PatientEntity does not exist');
      }

      if (isBefore(appointmentDate, Date.now())) {
        throw new AppError('You cannot create an appointment in past');
      }

      return this.appointmentRepository.create(request);
    }
}
