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

    public async findAll(): Promise<AppointmentEntity[]> {
      return this.appointments;
    }

    public async findByDateAndPatientEmail(date: Date, patientEmail: string): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.date === date && p.patient.email === patientEmail);
    }

    public async findByDateAndProfessionalEmail(date: Date, professionalEmail: string): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.date === date && p.professional.email === professionalEmail);
    }

    public async findAllByProfessionalId(professionalId: number): Promise<AppointmentEntity[]> {
      return this.appointments.filter((appointment) => appointment.professional.id === professionalId);
    }

    public async findByIdAndProfessionalEmail(id: number, email: string): Promise<AppointmentEntity | undefined> {
      return this.appointments.find((p) => p.professional.email === email && p.id === id);
    }
}
