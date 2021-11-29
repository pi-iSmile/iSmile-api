import { container, inject, injectable } from 'tsyringe';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';
import AppError from '../../shared/AppError';
import GetProfessional from '../professional/get-professional';
import { AppointmentStatus } from '../../entity/appointment/appointment-status';

@injectable()
export default class GetAppointment {
  constructor(
        @inject(AppointmentRepository)
        private appointmentRepository: AppointmentRepository,
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

  public async findAllToDashboard(professionalEmail: string | null, patientEmail: string | null, status: AppointmentStatus | null, initialDate: Date | null, finalDate: Date | null): Promise<AppointmentEntity[]> {
    const query = this.appointmentRepository.repository.createQueryBuilder('appointment');

    query.leftJoinAndSelect('appointment.professional', 'professional');
    query.leftJoinAndSelect('appointment.patient', 'patient');

    if (professionalEmail != null) {
      query.andWhere('professional.email = :professionalEmail', { professionalEmail });
    }

    if (patientEmail != null) {
      query.andWhere('patient.email = :patientEmail', { patientEmail });
    }

    if (status != null) {
      query.andWhere('appointment.status = :status', { status });
    }

    if (initialDate != null) {
      query.andWhere('appointment.date >= :initialDate', { initialDate });
    }

    if (finalDate != null) {
      query.andWhere('appointment.date <= :finalDate', { finalDate });
    }

    return query.getMany();
  }
}
