import IAppointmentRepository from 'usecase/appointment/repository/appointment-repository';
import { AppointmentEntity } from '../../../entity/appointment/appointment.entity';

export class FakeAppointmentRepository implements IAppointmentRepository {
    private appointments: AppointmentEntity[] = [];

    private id = 0;

    public async create(request: AppointmentEntity): Promise<AppointmentEntity> {
      request.id = this.id;
      this.appointments.push(request);
      return request;
    }

    public async update(request: AppointmentEntity): Promise<AppointmentEntity> {
      const index = this.appointments.findIndex((p) => p.id === request.id);

      this.appointments[index] = request;

      return request;
    }

    public async findById(id: number): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.id === id);
    }

    public async findByStatus(status: string): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.status.toString === status.toString);
    }

    public async findByPatientId(patientId: number): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.patient.id = patientId);
    }

    public async findByProfessionalId(professionalId: number): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.professional.id === professionalId);
    }

    public async findByDateBetweenAndProfessionalId(from: Date, to: Date, professinonalId: number): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => (p.date >= from && p.date <= to && p.professional.id === professinonalId));
    }

    public async findAll(): Promise<AppointmentEntity[]> {
      return this.appointments;
    }
}
